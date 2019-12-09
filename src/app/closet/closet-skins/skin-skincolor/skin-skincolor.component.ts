import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from '../skinSelected.service';
import { SkinService } from 'src/app/services/skin.service';
import { SessionService } from 'src/app/services/session.service';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-skin-skincolor',
  templateUrl: './skin-skincolor.component.html',
  styleUrls: ['./skin-skincolor.component.css']
})
@Injectable({providedIn: 'root'})
export class SkinSkincolorComponent implements OnInit {
  @Input() skincolors: Skin[];
  @Input() player: Player;
  currentSkinToBeBought : Skin;
  playerViewingSkins: String[] = [];
  playerInitialSkins: String[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private session: SessionService, private skinService : SkinService) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();

    console.log(this.player);

    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)

    this.playerInitialSkins = this.session.playerSession.imagePath;

    console.log("initial skins on init()" + this.playerInitialSkins);

    this.playerViewingSkins = this.session.playerSession.imagePath;

    console.log("viewing skins on init()" + this.playerViewingSkins); 

    console.log(this.player);
  }

  skinSelected(skinSelected: Skin){
    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    this.session.playerSession.imagePath = this.playerViewingSkins;
  }
}