import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Skin } from 'src/app/shared/skin.model';
import { SkinService } from 'src/app/services/skin.service';
import { SessionService } from 'src/app/services/session.service';
import { Player } from 'src/app/shared/player.model';
import { Closet } from 'src/app/shared/closet.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

@Component({
  selector: 'app-skin-skincolor',
  templateUrl: './skin-skincolor.component.html',
  styleUrls: ['./skin-skincolor.component.css']
})
@Injectable({ providedIn: 'root' })
export class SkinSkincolorComponent implements OnInit {
  @Input() skincolors: Skin[];
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

  hasEnoughXP(skin: Skin) {
    if (this.player.xp >= skin.minXP) {
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

  skinSelected(skinSelected: Skin) {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);
    if (!this.playerHasBoughtSkin(skinSelected) && this.hasEnoughXP(skinSelected)) {
      this.skinService.addToShoppingCart(skinSelected);
    }
    this.skinService.setAnySkinSelected(true);
    this.skinService.addNewSkinInUse(skinSelected);
  }
}