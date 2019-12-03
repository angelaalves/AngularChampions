import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SkinSelectedService } from './skinSelected.service';
import { SessionService } from 'src/app/services/session.service';
import { Skin } from 'src/app/shared/skin.model';

@Injectable({providedIn: 'root'})
export class previewSkinSelected{

    constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, private sessionService: SessionService) { }

   skinSelected(skinSelected: Skin){
        this.skinSelectedService.addSkin(skinSelected);
        console.log(skinSelected.imagePath);
        this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    }
}