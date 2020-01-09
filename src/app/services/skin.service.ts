import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { HttpClient } from '@angular/common/http';
import { Closet } from '../shared/closet.model';
import { SessionService } from './session.service';
import { Player } from '../shared/player.model';
import { status } from '../shared/status.enum';


@Injectable({ providedIn: 'root' })
export class SkinService implements OnInit {

    private inactiveSkinsToBe: Skin[] = [];

    private skins: Skin[] = [];
    private newSkinsSelected = new BehaviorSubject<Skin[]>(this.skins);
    changingSkins = this.newSkinsSelected.asObservable();

    private s: String[] = ['', '', '', '', '', ''];
    private skinPaths = new BehaviorSubject<String[]>(this.s);
    newViewingSkins = this.skinPaths.asObservable();

    private skinsToBeBought: Skin[] = [];
    private shoppingCart = new BehaviorSubject<Skin[]>(this.skinsToBeBought);
    shoppingCartSkins = this.shoppingCart.asObservable();

    private anySkinSelected: boolean;

    private skinExists: boolean = false;
    private skinRemove: boolean = false;

    player: Player;

    constructor(private http: HttpClient, private session: SessionService) {
        const estado: status = status.Active;
        this.player = this.session.getPlayerInSession();
    }

    ngOnInit() {
        this.http.get<Closet[]>('http://localhost:8085/closet/Get?idPlayerFk=' + this.player.idplayer + "&status=" + status, {}).subscribe(data => {
            console.log(data);
            for (let d of data) {
                this.http.get<Skin>('http://localhost:8085/skins/Get=idSkin' + d.idskinFK).subscribe(resdata => {
                    console.log(resdata);
                    this.skins.push(resdata);
                    this.inactiveSkinsToBe.push(resdata);
                    console.log("skin service: "+this.inactiveSkinsToBe);
                });
            }
        });
    }

    isShoppingCartEmpty() {
        if (this.skinsToBeBought.length > 0) {
            return false;
        }
        return true;
    }

    addNewSkinInUse(skin: Skin) {
        let index;
        if (skinType.Hair == skin.skinType) {
            index = 0;
        } else if (skinType.SkinColor == skin.skinType) {
            index = 1;
        } else if (skinType.Top == skin.skinType) {
            index = 2;
        } else if (skinType.Bottom == skin.skinType) {
            index = 3;
        } else if (skinType.Shoes == skin.skinType) {
            index = 4;
        } else if (skinType.Others == skin.skinType) {
            index = 5;
        }
        console.log(this.skins);
        this.inactiveSkinsToBe.push(this.skins[index]);
        console.log(this.inactiveSkinsToBe);
        this.newSkinsSelected.next(this.skins.splice(Number(index), 0, skin));
    }

    addToShoppingCart(skin: Skin) {
        this.skinExists = false;
        if (this.skinsToBeBought.length > 0) {
            for (let s of this.skinsToBeBought) {
                if (s.idskin == skin.idskin) {
                    this.skinExists = true;
                }
            }
            if (this.skinExists == false) {
                this.skinsToBeBought.push(skin);
                this.shoppingCart.next(this.skinsToBeBought);
                return skin;
            }
        } else if (this.skinsToBeBought.length <= 0) {
            this.skinsToBeBought.push(skin);
            this.shoppingCart.next(this.skinsToBeBought);
            return skin;
        }
    }

    removeAllFromShoppingCart() {
        const skinsToBeBought: Skin[] = []
        this.shoppingCart = new BehaviorSubject<Skin[]>(skinsToBeBought);
    }

    removeFromShoppingCart(skin: Skin) {
        for (let s of this.skinsToBeBought) {
            if (s.idskin == skin.idskin) {
                this.skinRemove = true;
            }
        }
        if (this.skinRemove == true) {
            this.skinsToBeBought.splice(this.skinsToBeBought.indexOf(skin), 1);
            this.shoppingCart.next(this.skinsToBeBought);
            return true;
        } else {
            return false;
        }
    }

    emptyCart() {
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