import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Skin } from '../shared/skin.model';

@Injectable({ providedIn: 'root' })
export class SkinService {
    private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", null));
    currentSkinSelected = this.skin.asObservable();

    private s: String[] = ['', '', '', '', '', '']
    private skinPaths = new BehaviorSubject<String[]>(this.s);
    newViewingSkins = this.skinPaths.asObservable();

    private anySkinSelected: boolean;

    updateSkin(skin: Skin) {
        this.skin.next(skin);
        return skin;
    }

    getAnySkinSelected(){
        return this.anySkinSelected;
    }

    getSkin(){
        return this.skin;
    }

    getArraySkin() {
        return this.skinPaths;
    }

    setArraySkin(paths: String[]) {
        this.skinPaths.next(paths);
    }

    setAnySkinSelected(b:boolean){
        this.anySkinSelected=b;
    }
}