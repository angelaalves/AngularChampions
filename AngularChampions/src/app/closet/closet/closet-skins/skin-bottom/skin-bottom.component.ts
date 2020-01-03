import { Component, Input, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { Player } from 'src/app/shared/player.model';
import { ClosetComponent } from '../../closet.component';
import { skinType } from 'src/app/shared/skinType.enum';
import { Closet } from 'src/app/shared/closet.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-skin-bottom',
  templateUrl: './skin-bottom.component.html',
  styleUrls: ['./skin-bottom.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinBottomComponent implements OnInit {
  @Input() bottoms: Skin[];
  @Input() player: Player;
  playerInitialSkins: String[] = [];
  playerViewingSkins: String[] = [];
  allsessionsuserskins: Closet[] = [];
  shoppingCartSkins: Skin[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private session: SessionService, private skinService: SkinService, private closet: ClosetComponent, private http: HttpClient) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();

    console.log(this.player);

    this.skinService.shoppingCartSkins.subscribe(shoppingCart => this.shoppingCartSkins = shoppingCart);

    this.playerInitialSkins = this.session.playerSession.imagePath;

    this.playerViewingSkins = this.session.playerSession.imagePath;

    console.log(this.player);
    this.http.get<Closet[]>('http://localhost:8189/closet/Get?idSkinFK= &idPlayerFk=' + this.session.getPlayerInSession().idplayer + "&status=", {}).subscribe(data => {
      this.allsessionsuserskins = data;
      console.log("this.alluserskins ", this.allsessionsuserskins);
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

  emptyCart() {
    this.skinService.emptyCart();
    this.redirectBackToCloset();
  }

  redirectBackToCloset() {
    this.router.navigate(['../closet'], { relativeTo: this.route });
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
    this.session.playerSession.imagePath = this.session.playerSession.imagePath;
    this.skinService.setAnySkinSelected(true);
  }

  skinSelectedNull() {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("./../../../assets/Bottom/BottomNull.png", skinType.Bottom);
    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }
}