import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { SkinSelectedService } from '../skinSelected.service';
import { Player } from 'src/app/shared/player.model';
import { skinType } from 'src/app/shared/skinType.enum';

@Component({
  selector: 'app-skin-shoes',
  templateUrl: './skin-shoes.component.html',
  styleUrls: ['./skin-shoes.component.css']
})
@Injectable({providedIn: 'root'})
export class SkinShoesComponent implements OnInit {
  @Input() shoes: Skin[];
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
    this.playerViewingSkins=this.playerInitialSkins;
    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }

  
  skinSelectedNull(){
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("./../../../assets/Bottom/BottomNull.png", skinType.Shoes);

    this.skinService.updateSkin(new Skin("10000","shoesNull","./../../../assets/Shoes/ShoesNull.png","0","0",skinType.Shoes));

    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }
}