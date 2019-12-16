import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { SkinSelectedService } from '../skinSelected.service';
import { ClosetComponent } from '../../closet.component';
import { skinType } from 'src/app/shared/skinType.enum';
import { Closet } from 'src/app/shared/closet.model';

@Component({
  selector: 'app-skin-top',
  templateUrl: './skin-top.component.html',
  styleUrls: ['./skin-top.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinTopComponent implements OnInit {
  @Input() tops: Skin[];
  @Input() player: Player;
  playerInitialSkins: String[] = [];
  playerViewingSkins: String[] = [];
  allsessionsuserskins: Closet[] = [];
  shoppingCartSkins: Skin[] = [];

  constructor(private session: SessionService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private skinSelectedService: SkinSelectedService,
    private skinService: SkinService, private closet: ClosetComponent) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    console.log(this.player);
    this.skinService.shoppingCartSkins.subscribe(shoppingCart => this.shoppingCartSkins = shoppingCart);
    this.playerInitialSkins = this.session.playerSession.imagePath;
    console.log("initial skins on init()" + this.playerInitialSkins);
    this.playerViewingSkins = this.session.playerSession.imagePath;
    console.log("viewing skins on init()" + this.playerViewingSkins);
    console.log(this.player);
    this.http.get<Closet[]>('http://localhost:8085/closet/Get?idSkinFK= &idPlayerFk=' + this.session.getPlayerInSession().idplayer + "&status=", {}).subscribe(data => {
      this.allsessionsuserskins = data;
      console.log("this.alluserskins ", this.allsessionsuserskins);
      for (let s of this.allsessionsuserskins) {
        console.log(this.allsessionsuserskins + "element: " + s);
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

    if (this.playerHasBoughtSkin(skinSelected) == false) {
      this.skinService.addToShoppingCart(skinSelected);
    }
    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }

  skinSelectedNull() {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("../../../../assets/Top/TopNull.png", skinType.Top);
    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }
}