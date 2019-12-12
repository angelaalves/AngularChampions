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
  playerInitialSkins: String[] = [];
  playerViewingSkins: String[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private session: SessionService, private skinService: SkinService, private closet: ClosetComponent) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();

    console.log(this.player);

    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)

    this.playerInitialSkins = this.session.playerSession.imagePath;

    console.log("initial skins on init()" + this.playerInitialSkins);

    this.playerViewingSkins = this.session.playerSession.imagePath;

    console.log("viewing skins on init()" + this.playerViewingSkins);

    console.log(this.player);

    //this.skinSelected(this.currentSkinToBeBought);
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

  skinSelectedNull(){
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("./../../../assets/Bottom/BottomNull.png", skinType.Bottom);

    this.skinService.updateSkin(new Skin("10000","bottomNull","./../../../assets/Bottom/BottomNull.png","0","0",skinType.Bottom));

    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }
}