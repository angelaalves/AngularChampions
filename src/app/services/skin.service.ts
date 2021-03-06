import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Skin } from '../shared/skin.model';
import { HttpClient } from '@angular/common/http';
import { Closet } from '../shared/closet.model';
import { SessionService } from './session.service';
import { Player } from '../shared/player.model';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

@Injectable({ providedIn: 'root' })
export class SkinService {

    private inactiveSkinsToBe: Skin[] = [];

    private skins: Skin[] = [];
    private newSkinsSelected = new BehaviorSubject<Skin[]>(this.skins);
    changingSkins = this.newSkinsSelected.asObservable();

    private s: String[] = ['', '', '', '', '', ''];
    private skinPaths = new Subject<String[]>();
    newViewingSkins = this.skinPaths.asObservable();

    skinsToBeBought: Skin[] = [];
    shoppingCart = new Subject<Skin[]>();
    shoppingCartSkins = this.shoppingCart.asObservable();

    private anySkinSelected: boolean;

    private skinExists: boolean = false;
    private skinRemove: boolean = false;

    totalcost = new Subject<number>();

    player: Player;

    constructor(private http: HttpClient, private session: SessionService, private configuration: AppConfigurationsComponent) { }

    ngOnInit() {
        this.player = this.session.getPlayerInSession();
        this.http.get<Closet[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/Get?idPlayerFk=' + this.player.idplayer, {}).subscribe(data => {
            let activeSkins: String[] = [];
            for (let skin of data) {
                if (skin.status == "Active") {
                    activeSkins.push(skin.idskinFK);
                }
            }
            this.http.get<Skin[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/skins/getSkinList?SkinIds=' + activeSkins.toString()).subscribe(resdata => {
                this.skins = resdata;
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
        var found = false;
        for (var i: number = 0; i < this.skins.length; i++) {
            if (this.skins[i].skinType == skin.skinType) {
                found = true
                this.inactiveSkinsToBe.push(this.skins[i]);
                this.skins[i] = skin
                this.newSkinsSelected.next(this.skins)
            }
        }
        if (found == false) {
            this.skins.push(skin)
            this.newSkinsSelected.next(this.skins)
        }
    }

    addToShoppingCart(skin: Skin) {
        
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
                this.totalcost.next(+skin.champiesCost)
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
            }
        });
        if (this.skinRemove == true) {
            this.totalcost.next(+skin.champiesCost * (-1));
            this.skinsToBeBought.splice(this.skinsToBeBought.indexOf(skin), 1);
            this.shoppingCart.next(this.skinsToBeBought);
            return true;
        } else {
            return false;
        }
    }

    emptyCart() {
        this.totalcost.next(0);
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
    clearInactiveSkinsToBe() {
        this.inactiveSkinsToBe = [];
    }
}