import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { HttpClient } from '@angular/common/http';
import { Closet } from '../shared/closet.model';
import { SessionService } from './session.service';
import { Player } from '../shared/player.model';
import { status } from '../shared/status.enum';

@Injectable({ providedIn: 'root' })
export class SkinService {

    private inactiveSkinsToBe: Skin[] = [];

    private skins: Skin[] = [];
    private newSkinsSelected = new BehaviorSubject<Skin[]>(this.skins);
    changingSkins = this.newSkinsSelected.asObservable();

    private s: String[] = ['', '', '', '', '', ''];
    private skinPaths = new Subject<String[]>();
    newViewingSkins = this.skinPaths.asObservable();

    private skinsToBeBought: Skin[] = [];
    private shoppingCart = new BehaviorSubject<Skin[]>(this.skinsToBeBought);
    shoppingCartSkins = this.shoppingCart.asObservable();

    private anySkinSelected: boolean;

    private skinExists: boolean = false;
    private skinRemove: boolean = false;

    totalcost = 0;

    player: Player;

    constructor(private http: HttpClient, private session: SessionService){}

    ngOnInit() {
        this.player = this.session.getPlayerInSession();
        this.http.get<Closet[]>('http://localhost:8085/closet/Get?idPlayerFk=' + this.player.idplayer, {}).subscribe(data => {
            let activeSkins: String[] = [];
            for (let skin of data) {
                if (skin.status == "Active") {
                    activeSkins.push(skin.idskinFK);
                }
            }
            this.http.get<Skin[]>('http://localhost:8085/skins/getSkinList?SkinIds=' + activeSkins.toString()).subscribe(resdata => {
                this.skins=resdata;
                console.log(this.skins)
            });
        });
    }

    isShoppingCartEmpty() {
        if (this.skinsToBeBought.length > 0) {
            return false;
        }
        return true;
    }

    addNewSkinInUse(skin: Skin) {
        var found=false;
        for (var i: number = 0; i < this.skins.length; i++) {
            if (this.skins[i].skinType == skin.skinType) {
                found=true
                this.inactiveSkinsToBe.push(this.skins[i]);
                this.skins[i] = skin
                this.newSkinsSelected.next(this.skins)
            }
        }
        if(found==false){
            this.skins.push(skin)
            this.newSkinsSelected.next(this.skins)
        }

    }

    addToShoppingCart(skin: Skin) {
        this.totalcost += Number(skin.champiesCost);
        this.skinExists = false;
        if (this.skinsToBeBought.length > 0) {
            this.skinsToBeBought.forEach(s => {
                if (s.idskin == skin.idskin) {
                    this.skinExists = true;
                }
            });
            if (this.skinExists == false) {
                this.skinsToBeBought.push(skin);
                this.shoppingCart.next(this.skinsToBeBought);
                return skin;
            }
        } else {
            this.skinsToBeBought.push(skin);
            this.shoppingCart.next(this.skinsToBeBought);
            return skin;
        }
    }

    removeAllFromShoppingCart() {
        this.shoppingCart = new BehaviorSubject<Skin[]>([]);
    }

    removeFromShoppingCart(skin: Skin) {
        this.skinsToBeBought.forEach(s => {
            if (s.idskin == skin.idskin) {
                this.skinRemove = true;
                this.totalcost += Number(s.champiesCost);
            }
        });
        if (this.skinRemove == true) {
            this.totalcost -= Number(skin.champiesCost);
            this.skinsToBeBought.splice(this.skinsToBeBought.indexOf(skin), 1);
            this.shoppingCart.next(this.skinsToBeBought);
            return true;
        } else {
            return false;
        }
    }

    emptyCart() {
        this.totalcost = 0;
        const s: Skin[] = [];
        this.skinsToBeBought = s;
        this.shoppingCart.next(this.skinsToBeBought);
    }

    getSkins() {
        return this.skins;
    }

    getInactiveSkinsToBe() {
        return this.inactiveSkinsToBe;
    }

    getShoppingCart() {
        return this.shoppingCart;
    }

    getSkinExists() {
        return this.skinExists;
    }

    getSkinRemove() {
        return this.skinRemove;
    }

    getNewSkinsSelected() {
        return this.newSkinsSelected;
    }

    getAnySkinSelected() {
        return this.anySkinSelected;
    }

    getArraySkin() {
        return this.s;
    }

    setArraySkin(paths: String[]) {
        this.skinPaths.next(paths);
    }

    setAnySkinSelected(b: boolean) {
        this.anySkinSelected = b;
    }
}