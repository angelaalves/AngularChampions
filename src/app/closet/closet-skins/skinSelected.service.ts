import { Skin } from 'src/app/shared/skin.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class SkinSelectedService{
    skin: Skin;

    addSkin(skin: Skin){
        this.skin=skin;
    }

    getSkin(){
        return this.skin;
    }
}