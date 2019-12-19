import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SkinService } from '../services/skin.service';
import { BehaviorSubject } from 'rxjs';
import { status } from 'src/app/shared/status.enum';
import { Closet } from '../shared/closet.model';

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
  allsessionsuserskins: Closet[] = [];

  private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", null));
  closetSkinSelected = this.skin.asObservable();

  constructor(private session: SessionService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute, private skinService: SkinService) {
    this.http.get<Closet[]>('http://localhost:8085/closet/Get?idSkinFK= &idPlayerFk=' + this.session.getPlayerInSession().idplayer + "&status=", {}).subscribe(data => {
      this.allsessionsuserskins = data;
      console.log("this.alluserskins ", this.allsessionsuserskins);
    });
  }

  ngOnInit() {
    this.player = this.session.playerSession;
    this.getSkins();
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

  applySkins() {
    let objSkin: Closet;
    const statusSkin: status = status.Active;
    for (let skin of this.allsessionsuserskins) {
      this.http.get<Closet>('http://localhost:8085/closet/Get?idSkinFK=' + skin.idskinFK).subscribe(data => {
        objSkin = data[0];
      });
      if (skin.idskinFK == objSkin.idskinFK) {
        const idskin = skin.idskinFK;
        const idPlayer = this.session.getPlayerInSession().idplayer;
        this.http.post('http://localhost:8085/closet/Update?idSkinFK=' + skin.idskinFK + "&idPlayerFk=" + idPlayer + "&status=" + statusSkin, { idskin, idPlayer, statusSkin }).subscribe(data => {
          console.log(data);
        });
        //this.session.getPlayerInSession().changeImage(skin.imagePath, objSkin.skinType);
        let counter = 0;
        for (let item of this.session.getPlayerInSession().imagePath) {
          counter++;
          const idskinToChange = this.session.getPlayerInSession().imagePath[counter];
          const statusInactive = status.Inactive;
          this.http.post('http://localhost:8085/closet/Update?idSkinFK=' + idskinToChange + "&idPlayerFk=" + idPlayer + "&status=" + statusInactive, { idskinToChange, idPlayer, statusInactive }).subscribe(data => {
            console.log(data);
          });
        }
      }
    }
  }
}