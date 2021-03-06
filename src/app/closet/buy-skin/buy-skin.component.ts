import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { status } from '../../shared/status.enum';
import { SessionService } from 'src/app/services/session.service';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { SkinService } from 'src/app/services/skin.service';
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

@Component({
  selector: 'app-buy-skin',
  templateUrl: './buy-skin.component.html',
  styleUrls: ['./buy-skin.component.css']
})

@Injectable({ providedIn: 'root' })
export class BuySkinComponent implements OnInit {
  player: Player;
  activeSkins: Skin[] = [];
  shoppingCartSkins: Skin[] = [];
  bodyText: string = '';
  totalcost: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService,
    private skinService: SkinService, private configuration: AppConfigurationsComponent) {
    this.player = this.session.getPlayerInSession();
  }

  ngOnInit() {
    this.shoppingCartSkins=this.skinService.skinsToBeBought;
  }

  redirectBackToCloset() {
    this.router.navigate(['../closet'], { relativeTo: this.route });
  }

  removeItem(skin: Skin) {
    this.totalcost -= Number(skin.champiesCost);
    this.skinService.removeFromShoppingCart(skin);
  }

  emptyCart() {
    this.skinService.emptyCart();
    this.redirectBackToCloset();
  }

  buySkin() {
    const idplayer = this.session.getPlayerInSession().idplayer;
    for (let item of this.shoppingCartSkins) {
      var idSkin = item.idskin;
      this.totalcost += Number(item.champiesCost);
      if (+this.player.myChampies >= +item.champiesCost && +this.player.xp >= +item.minXP) {
        this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/Create?idSkinFK=' + idSkin + '&idPlayerFk=' + idplayer + '&status=',
          {
            idSkin,
            idplayer,
          }
        ).subscribe();
        this.activeSkins.push(item);
        const userName = this.session.playerSession.userName;
        const email = this.session.playerSession.email;
        const password = this.session.playerSession.password;
        const gender = this.session.playerSession.gender;
        const xp = this.session.playerSession.xp;
        const champiesToGive = this.session.playerSession.champiesToGive;
        const userType = this.session.playerSession.userType;
        const status2 = this.session.playerSession.status;
        const myChampiesAfterBuyingSkin = Number(this.player.myChampies) - Number(item.champiesCost);
        this.http.post('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/Update?idPlayer=' + idplayer + ' &userName=' + userName + ' &email=' + email + ' &password=' + this.session.getPlayerInSession().password + '&gender=' + gender + ' &userType=' + userType + ' &xp=' + xp + ' &champiesToGive=' + champiesToGive + ' &myChampies=' + myChampiesAfterBuyingSkin.toString() + '&status=Active',
          {}).subscribe();
        this.session.getPlayerInSession().myChampies = myChampiesAfterBuyingSkin.toString();
        this.Champies();
        let counter: number = -1;
        for (let activeSkin of this.activeSkins) {
          counter++;
          const skinID = activeSkin.idskin;
          const skinStatus = status.Inactive;
          if (activeSkin.skinType === item.skinType) {
            this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/Update?idSkinFK=' + skinID + '&idPlayerFk=' + idplayer + '&status=' + skinStatus,
              { skinID, idplayer, skinStatus }
            );
          }
        }
      this.player.changeImage(item.imagePath, item.skinType);
      this.activeSkins.push(item);
      this.skinService.emptyCart();
      } else{
        this.router.navigate(['../app-error-closet'], { relativeTo: this.route });
        return;
      }
      
    }
    this.router.navigate(['../closet'], { relativeTo: this.route });
  }

  Champies() {
    var playerData: Player = JSON.parse(localStorage.getItem('playerlogged'));
    if (!playerData) {
      return;
    } else {
      localStorage.setItem("playerlogged", JSON.stringify(this.session.playerSession));
    }
  }
}