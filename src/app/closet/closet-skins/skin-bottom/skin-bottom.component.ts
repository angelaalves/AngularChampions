import { Component, Input, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { Player } from 'src/app/shared/player.model';
import { ClosetComponent } from '../../closet.component';

@Component({
  selector: 'app-skin-bottom',
  templateUrl: './skin-bottom.component.html',
  styleUrls: ['./skin-bottom.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinBottomComponent implements OnInit {
  @Input() bottoms: Skin[];
  @Input() player: Player;
  currentUserSkins: Skin[];
  currentSkinToBeBought: Skin;
  playerInitialSkins: String[] = [];
  playerViewingSkins: String[] = [];
  closetSkinSelected: Skin;

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

    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);

    this.skinService.updateSkin(skinSelected);

    this.session.playerSession.imagePath = this.playerViewingSkins;
    
  }
}