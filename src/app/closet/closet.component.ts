import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { AuthenticationService } from '../login/authentication/authentication.service';
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
  currentSkinToBeBought: Skin;
  newViewingSkins: String[];
  initialSkins: String[];

  private skin = new BehaviorSubject<Skin>(new Skin("", "", "", "", "", null));
  closetSkinSelected = this.skin.asObservable();


  constructor(private session: SessionService, private http: HttpClient, private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute, private skinService: SkinService) { }

  /*ngOnInit() {
    this.player = this.session.getPlayerInSession();
    console.log(this.player);
    this.getSkins();
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
    this.skinService.newViewingSkins.subscribe(skinPaths => this.newViewingSkins = skinPaths)
    console.log(this.currentSkinToBeBought)
    this.viewSkin(this.currentSkinToBeBought);
    this.newViewingSkins = this.skinService.getArraySkin().getValue();
    console.log("array de skins novas " + this.skinService.getArraySkin().getValue());
  }*/

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    this.initialSkins = this.session.getPlayerInSession().imagePath;
    this.getSkins();
    this.newViewingSkins = this.skinService.getArraySkin().getValue();
    console.log("array de skins novas " + this.skinService.getArraySkin().getValue());
  }

  viewSkin(skin: Skin) {
    //this.playerViewingSkins = this.playerInitialSkins;
    this.session.getPlayerInSession().changeImage(skin.imagePath, skin.skinType);
    console.log(skin.imagePath, skin.skinType);
    const obj2 = JSON.parse('{"idSkin": this.closetSkinSelected.idSkin, "skinName": this.closetSkinSelected.skinName, "imagePath": this.closetSkinSelected.imagePath,"minXP": this.closetSkinSelected.minXP, "champiesCost": this.closetSkinSelected.champiesCost, "skinType": this.closetSkinSelected.skinType}');
    console.log("json parse " + obj2);
    //this.player.imagePath=this.skinService.getArraySkin().getValue();
  }

  updateViewingSkins() {
    this.player.imagePath = this.newViewingSkins;
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
    this.router.navigate(['../buy_skin'], { relativeTo: this.route });
  }

  resetToInitialSkins() {
    this.newViewingSkins=this.initialSkins;
  }
}