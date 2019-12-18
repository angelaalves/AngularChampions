import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SkinService } from '../services/skin.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.css']
})

@Injectable({ providedIn: 'root' })
export class ClosetComponent implements OnInit {
  player: Player;
  skincolors: Skin[] = [];
  bottoms: Skin[] = [];
  hair: Skin[] = [];
  tops: Skin[] = [];
  shoes: Skin[] = [];
  others: Skin[] = [];
  newViewingSkins: String[];
  initialSkins: String[];
  shoppingCartSkins: Skin[] = [];

  private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", null));
  closetSkinSelected = this.skin.asObservable();

  constructor(private session: SessionService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute, private skinService: SkinService) { }

  ngOnInit() {
    this.player = this.session.playerSession;
    this.initialSkins = this.session.getPlayerInSession().imagePath;
    this.getSkins();
    this.newViewingSkins = this.player.imagePath;
    console.log("array de skins novas " + this.player.imagePath);

    this.skinService.shoppingCartSkins.subscribe(shoppingCart => this.shoppingCartSkins = shoppingCart);
    this.skinService.newViewingSkins.subscribe(skinPaths => this.newViewingSkins = skinPaths);
    //this.newViewingSkins = this.skinService.getArraySkin().getValue();
  }

  viewSkin(skin: Skin) {
    this.session.getPlayerInSession().changeImage(skin.imagePath, skin.skinType);
    console.log(skin.imagePath, skin.skinType);
  }

  getSkins() {
    return new Promise(resolve => {
      this.http.get<Skin[]>('http://localhost:8085/skins/getAll', {}).subscribe(data => {
        for (var d of data) {
          if (d.skinType == skinType.Bottom) {
            this.bottoms.push(d);
          } else if (d.skinType == skinType.SkinColor) {
            this.skincolors.push(d);
          } else if (d.skinType == skinType.Hair) {
            this.hair.push(d);
          } else if (d.skinType == skinType.Top) {
            this.tops.push(d);
          } else if (d.skinType == skinType.Shoes) {
            this.shoes.push(d);
          } else if (d.skinType == skinType.Others) {
            this.others.push(d);
          }
        }
      })
    });
  }

  redirectToBuySkin() {
    if (this.skinService.isShoppingCartEmpty() == false) {
      this.router.navigate(['../buy_skin'], { relativeTo: this.route });
    }
  }
  
  resetToInitialSkins() {
    this.skinService.setAnySkinSelected(false);
    this.session.playerSession.resetImage();
  }

  emptyCart() {
    this.skinService.emptyCart();
    this.redirectBackToCloset();
  }

  redirectBackToCloset() {
    this.router.navigate(['../closet'], { relativeTo: this.route });
  }
}