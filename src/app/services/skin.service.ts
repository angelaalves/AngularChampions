import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    private skinPaths = new BehaviorSubject<String[]>(this.s);
    newViewingSkins = this.skinPaths.asObservable();

    private skinsToBeBought: Skin[] = [];
    private shoppingCart = new BehaviorSubject<Skin[]>(this.skinsToBeBought);
    shoppingCartSkins = this.shoppingCart.asObservable();

    private anySkinSelected: boolean;

    private skinExists: boolean = false;
    private skinRemove: boolean = false;

    totalcost: number = 0;

    player: Player;

    constructor(private http: HttpClient, private session: SessionService) { }

    ngOnInit() {
        this.skins = [];
        this.inactiveSkinsToBe = [];
        this.http.get<Closet[]>('http://localhost:8085/closet/Get?idSkinFK=&idPlayerFk=' + this.player.idplayer + "&status=" + status.Active, {}).subscribe(data => {
            console.log(data);
            data.forEach(d => {
                this.http.get<Skin[]>('http://localhost:8085/skins/Get?idSkin=' + d.idskinFK).subscribe(resdata => {
                    this.skins.push(resdata[0]);
                    this.inactiveSkinsToBe.push(resdata[0]);
                });
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
        this.skins = [];
        this.inactiveSkinsToBe = [];
        this.player = this.session.getPlayerInSession();
        this.http.get<Closet[]>('http://localhost:8085/closet/Get?idPlayerFk=' + this.player.idplayer + "&status=" + status.Active, {}).subscribe(data => {
            console.log(data);
            data.forEach(d => {
                this.http.get<Skin[]>('http://localhost:8085/skins/Get?idSkin=' + d.idskinFK).subscribe(resdata => {
                    this.skins.push(resdata[0]);
                    this.inactiveSkinsToBe.push(resdata[0]);
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
                    this.inactiveSkinsToBe.push(this.skins[index]);
                    this.newSkinsSelected.next(this.skins.splice(Number(index), 0, skin));
                });
            });
            console.log(this.skins);
            console.log(this.inactiveSkinsToBe);
        });
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
        } else if (this.skinsToBeBought.length <= 0) {
            this.skinsToBeBought.push(skin);
            this.shoppingCart.next(this.skinsToBeBought);
            return skin;
        }
    }

    removeAllFromShoppingCart() {
        this.totalcost = 0;
        const skinsToBeBought: Skin[] = [];
        this.shoppingCart = new BehaviorSubject<Skin[]>(skinsToBeBought);
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