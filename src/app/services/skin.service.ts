import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Skin } from '../shared/skin.model';

@Injectable({ providedIn: 'root' })
export class SkinService {

    private s: String[] = ['', '', '', '', '', ''];
    private skinPaths = new BehaviorSubject<String[]>(this.s);
    newViewingSkins = this.skinPaths.asObservable();

    private skinsToBeBought: Skin[] = [];
    private shoppingCart = new BehaviorSubject<Skin[]>(this.skinsToBeBought);
    shoppingCartSkins = this.shoppingCart.asObservable();

    private anySkinSelected: boolean;

    private skinExists: boolean = false;
    private skinRemove: boolean = false;

    isShoppingCartEmpty() {
        if (this.skinsToBeBought.length > 0) {
            return false;
        }
        return true;
    }

    addToShoppingCart(skin: Skin) {
        if (this.skinsToBeBought.length > 0) {
            for (let s of this.skinsToBeBought) {
                if (s.idskin == skin.idskin) {
                    this.skinExists = true;
                } else {
                    this.skinExists = false;
                }
            }
            if (this.skinExists == false) {
                this.skinsToBeBought.push(skin);
                this.shoppingCart.next(this.skinsToBeBought);
                return skin;
            }
        } else if (this.skinsToBeBought.length <= 0){
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

    getShoppingCart() {
        return this.shoppingCart;
    }

    getSkinExists() {
        return this.skinExists;
    }

    getSkinRemove() {
        return this.skinRemove;
    }

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