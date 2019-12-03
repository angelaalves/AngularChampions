import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from '../skinSelected.service';
import { SkinService } from 'src/app/services/skin.service';
import { previewSkinSelected } from '../previewSkinSelected.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-skin-hair',
  templateUrl: './skin-hair.component.html',
  styleUrls: ['./skin-hair.component.css']
})

@Injectable({providedIn: 'root'})
export class SkinHairComponent implements OnInit {
  @Input() hair: Skin[];
  currentSkinToBeBought : Skin;

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private sessionService: SessionService, private skinService : SkinService) { }

  ngOnInit() {
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
  }

  skinSelected(skinSelected: Skin) {
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);
    this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}