import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Skin } from '../shared/skin.model';

@Injectable({ providedIn: 'root' })
export class SkinService {
    /*private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", null));
    currentSkinSelected = this.skin.asObservable();*/

    private s: String[] = ['', '', '', '', '', ''];
    private skinPaths = new BehaviorSubject<String[]>(this.s);
    newViewingSkins = this.skinPaths.asObservable();

    private skinsToBeBought: Skin[] = [];
    private shoppingCart = new BehaviorSubject<Skin[]>(this.skinsToBeBought);
    shoppingCartSkins = this.shoppingCart.asObservable();

    private anySkinSelected: boolean;

    isShoppingCartEmpty() {
        if (this.skinsToBeBought.length > 0) {
            return false;
        }
        return true;
    }

    addToShoppingCart(skin: Skin) {
        this.skinsToBeBought.push(skin);
        this.shoppingCart.next(this.skinsToBeBought);
        return skin;
    }

    removeFromShoppingCart(skin: Skin) {
        for (let s of this.skinsToBeBought) {
            if (s.idskin == skin.idskin) {
                this.skinsToBeBought.splice(this.skinsToBeBought.indexOf(skin), 1);
                this.shoppingCart.next(this.skinsToBeBought);
                return true;
            }
        }
        return false;
    }

    getShoppingCart() {
        return this.shoppingCart;
    }

    /*updateSkin(skin: Skin) {
        this.skin.next(skin);
        return skin;
    }

    getSkin() {
        return this.skin;
    }*/

    getAnySkinSelected() {
        return this.anySkinSelected;
    }

    getArraySkin() {
        return this.skinPaths;
    }

    setArraySkin(paths: String[]) {
        this.skinPaths.next(paths);
    }

    setAnySkinSelected(b: boolean) {
        this.anySkinSelected = b;
    }
}