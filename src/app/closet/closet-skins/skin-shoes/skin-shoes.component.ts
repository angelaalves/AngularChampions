import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { Player } from 'src/app/shared/player.model';
import { skinType } from 'src/app/shared/skinType.enum';
import { Closet } from 'src/app/shared/closet.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

@Component({
  selector: 'app-skin-shoes',
  templateUrl: './skin-shoes.component.html',
  styleUrls: ['./skin-shoes.component.css']
})
@Injectable({ providedIn: 'root' })
export class SkinShoesComponent implements OnInit {
  @Input() shoes: Skin[];
  @Input() player: Player;
  playerViewingSkins: String[] = [];
  playerInitialSkins: String[] = [];
  allsessionsuserskins: Closet[] = [];
  shoppingCartSkins: Skin[] = [];
  skins: Skin[] = [];

  constructor(private session: SessionService, private skinService: SkinService, private http: HttpClient, private configuration: AppConfigurationsComponent) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    this.skinService.shoppingCartSkins.subscribe(shoppingCart => this.shoppingCartSkins = shoppingCart);
    this.skinService.changingSkins.subscribe(newSkinsSelected => this.skins = newSkinsSelected);
    this.playerInitialSkins = this.session.playerSession.imagePath;
    this.playerViewingSkins = this.session.playerSession.imagePath;
    this.http.get<Closet[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/Get?idSkinFK= &idPlayerFk=' + this.session.getPlayerInSession().idplayer + "&status=", {}).subscribe(data => {
      this.allsessionsuserskins = data;
      for (let s of this.allsessionsuserskins) {
        return true;
      }
      return false;
    });
  }

  skinInUse(skin: Skin) {
    if (this.session.playerSession.imagePath.includes(skin.imagePath)) {
      return true;
    }
    return false;
  }

  hasEnoughXP(skin: Skin){
    if(this.player.xp>=skin.minXP){
      return true;
    }
    return false;
  }
  
  playerHasBoughtSkin(skin: Skin) {
    for (let s of this.allsessionsuserskins) {
      if (s.idskinFK == skin.idskin) {
        return true;
      }
    }
    return false;
  }

  imageNull(skin: Skin) {
    if (skin.imagePath == "../../assets/AppImages/None.png") {
      return true;
    }
    return false;
  }

  skinSelected(skinSelected: Skin) {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);
    if (!this.playerHasBoughtSkin(skinSelected) && this.hasEnoughXP(skinSelected)) {
      this.skinService.addToShoppingCart(skinSelected);
    }
    this.skinService.setAnySkinSelected(true);
    this.skinService.addNewSkinInUse(skinSelected);
  }

  skinSelectedNull(skinSelected: Skin) {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("./../../../assets/Bottom/BottomNull.png", skinType.Shoes);
    this.skinService.setAnySkinSelected(true);
    this.skinService.addNewSkinInUse(skinSelected);
  }
}