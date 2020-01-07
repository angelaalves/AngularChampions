import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Skin } from 'src/app/shared/skin.model';
import { SessionService } from '../../services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { HttpClient } from '@angular/common/http';
import { skinType } from 'src/app/shared/skinType.enum';
import { Player } from '../../shared/player.model';

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

  private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", null));
  closetSkinSelected = this.skin.asObservable();

  constructor(private session: SessionService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute, private skinService: SkinService) { }

  ngOnInit() {
    this.player = this.session.playerSession;
    this.getSkins();
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
    this.router.navigate(['../closet'], { relativeTo: this.route });
  }

  applySkins(){
    
  }
}