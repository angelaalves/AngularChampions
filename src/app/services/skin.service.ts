import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';

@Injectable({ providedIn: 'root' })
export class SkinService {
    private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", skinType.Bottom));
    currentSkinSelected = this.skin.asObservable();

    updateSkin(skin: Skin) {
        this.skin.next(skin);
    }
}