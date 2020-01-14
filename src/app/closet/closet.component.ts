import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { SessionService } from '../services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SkinService } from '../services/skin.service';
import { Closet } from '../shared/closet.model';
import { userType } from '../shared/userType.enum';

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
  allSkins: Skin[] = [];
  allsessionsuserskins: Closet[] = [];

  //private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", null));
  //closetSkinSelected = this.skin.asObservable();

  constructor(private session: SessionService, private http: HttpClient,
    private router: Router, private route: ActivatedRoute, private skinService: SkinService) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    this.getSkins();
    this.skinService.ngOnInit()
    this.http.get<Closet[]>('http://localhost:8085/closet/Get?idSkinFK= &idPlayerFk=' + this.session.getPlayerInSession().idplayer + "&status=", {}).subscribe(data => {
      this.allsessionsuserskins = data;
    });
  }

  getSkins() {
    this.http.get<Skin[]>('http://localhost:8085/skins/getAll', {}).subscribe(data => {
      this.allSkins = data;
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
    const activeSkins = this.skinService.getSkins();
    var activeIds: String[] = [];
    const inactiveSkins = this.skinService.getInactiveSkinsToBe();
    var inactiveIds: String[] = [];
    activeSkins.forEach(inactive => {
      activeIds.push(inactive.idskin);
    })
    inactiveSkins.forEach(active => {
      inactiveIds.push(active.idskin);
    })
    this.http.post('http://localhost:8085/closet/changeStatusSkins?idSkins=' + activeIds.toString() + "&idPlayer=" + this.session.getPlayerInSession().idplayer + "&status=Active", {}).subscribe(data => {
      console.log(data);
      this.http.post('http://localhost:8085/closet/changeStatusSkins?idSkins=' + inactiveIds.toString() + "&idPlayer=" + this.session.getPlayerInSession().idplayer + "&status=Inactive", {}).subscribe(data => {
        this.skinService.clearInactiveSkinsToBe();
        console.log(data);
      });
    });
  }

  isItaWarrior() {
    var bol = false;
    if (this.session.playerSession.userType == userType.Warrior) {
      bol = true;
    }
    return bol;
  }
}