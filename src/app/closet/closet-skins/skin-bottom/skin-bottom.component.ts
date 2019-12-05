import { Component, Input, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from '../skinSelected.service';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { skinType } from 'src/app/shared/skinType.enum';

@Component({
  selector: 'app-skin-bottom',
  templateUrl: './skin-bottom.component.html',
  styleUrls: ['./skin-bottom.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinBottomComponent implements OnInit {
  @Input() bottoms: Skin[];
  currentSkinToBeBought: Skin;
  playerInitialSkins: string[] = [];
  playerViewingSkins: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService,
    private sessionService: SessionService, private skinService: SkinService) { }

  ngOnInit() {
    this.playerInitialSkins = this.sessionService.playerSession.imagePath;
    this.playerViewingSkins = this.playerInitialSkins;
    this.skinSelected(this.currentSkinToBeBought);
  }

  skinSelected(skinSelected: Skin) {
    this.playerViewingSkins = this.playerInitialSkins;
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);

    //duplicado da linha 32
    //this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
    //this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(this.currentSkinToBeBought);
    this.sessionService.playerSession.imagePath = this.playerViewingSkins;

    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }

  changeImage(imgPath: string, type: skinType) {
    let index;
    if (skinType.Hair == type) {
      index = 0;
    } else if (skinType.SkinColor == type) {
      index = 1;
    } else if (skinType.Top == type) {
      index = 2;
    } else if (skinType.Bottom == type) {
      index = 3;
    } else if (skinType.Shoes == type) {
      index = 4;
    } else if (skinType.Others == type) {
      index = 5;
    }
    this.playerViewingSkins.splice(Number(index), 1, imgPath);
  }
}