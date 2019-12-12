import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { SkinSelectedService } from '../skinSelected.service';
import { skinType } from 'src/app/shared/skinType.enum';

@Component({
  selector: 'app-skin-top',
  templateUrl: './skin-top.component.html',
  styleUrls: ['./skin-top.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinTopComponent implements OnInit {
  @Input() tops: Skin[];
  currentUserSkins: Skin[];
  currentSkinToBeBought: Skin;
  playerInitialSkins: String[] = [];
  playerViewingSkins: String[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private sessionService: SessionService, private skinService : SkinService) { }

  ngOnInit() {
    /*this.player = this.session.getPlayerInSession();
    console.log(this.player);
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
    this.playerInitialSkins = this.session.playerSession.imagePath;
    console.log("initial skins on init()" + this.playerInitialSkins);
    this.playerViewingSkins = this.session.playerSession.imagePath;
    console.log("viewing skins on init()" + this.playerViewingSkins);
    console.log(this.player);
  }

  playerHasBoughtSkin(skin: Skin) {
    this.http.get<Skin[]>('http://localhost:8085/closet/Get?idSkinFK= &idPlayerFk=' + this.player.idplayer, {}).subscribe(data => {
      for (let s of data) {
        if (s.idskin == skin.idskin) {
          return true;
        }
      } return false;
    });
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


  skinSelectedNull() {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("./../../../assets/Top/TopNull.png", skinType.Top);
    this.skinService.updateSkin(new Skin("10000", "topNull", "./../../../assetsTop/TopNull.png", "0", "0", skinType.Top));
    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }
}