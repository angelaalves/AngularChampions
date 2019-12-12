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
  currentSkinToBeBought : Skin;
  playerViewingSkins: String[] = [];
  playerInitialSkins: String[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private session: SessionService, private skinService : SkinService) { }

  ngOnInit() {
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)

    this.playerInitialSkins = this.session.playerSession.imagePath;

    console.log("initial skins on init()" + this.playerInitialSkins);

    this.playerViewingSkins = this.session.playerSession.imagePath;

    console.log("viewing skins on init()" + this.playerViewingSkins); 

    console.log(this.player);
  }

  skinSelected(skinSelected: Skin){
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);
    this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}