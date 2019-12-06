import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { SkinSelectedService } from '../skinSelected.service';
import { skinType } from 'src/app/shared/skinType.enum';
import { ClosetComponent } from '../../closet.component';

@Component({
  selector: 'app-skin-top',
  templateUrl: './skin-top.component.html',
  styleUrls: ['./skin-top.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinTopComponent implements OnInit {
  @Input() tops: Skin[];
  @Input() player: Player;
  currentUserSkins: Skin[];
  currentSkinToBeBought: Skin;
  playerInitialSkins: String[] = [];
  playerViewingSkins: String[] = [];


  closetSkinSelected: Skin;


  constructor(private session: SessionService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private skinSelectedService: SkinSelectedService,
    private skinService: SkinService, private closet: ClosetComponent) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    console.log(this.player);
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
    this.playerInitialSkins = this.session.playerSession.imagePath;
    console.log("initial skins on init()" + this.playerInitialSkins);
    this.playerViewingSkins = this.session.playerSession.imagePath;
    console.log("viewing skins on init()" + this.playerViewingSkins);
  }

  skinSelected(skinSelected: Skin) {
    console.log("before: " + this.playerViewingSkins);
    this.playerViewingSkins = this.playerInitialSkins;
    console.log("after: " + this.playerViewingSkins);
    console.log("image path: " + skinSelected.imagePath + " skin type: " + skinSelected.skinType);
    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);
    console.log("player viewing after update: " + this.playerViewingSkins);
    this.skinService.updateSkin(skinSelected);
    this.skinService.setArraySkin(this.playerViewingSkins);
    this.session.playerSession.imagePath = this.playerViewingSkins;this.closetSkinSelected = skinSelected;
    this.closet.closetSkinSelected.subscribe(closetSkinSelected => skinSelected = closetSkinSelected);
    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}