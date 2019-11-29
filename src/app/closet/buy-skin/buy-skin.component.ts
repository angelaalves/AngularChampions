import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { status } from '../../shared/status.enum';
import { SessionService } from 'src/app/services/session.service';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { SkinSelectedService } from '../closet-skins/skinSelected.service';

@Component({
  selector: 'app-buy-skin',
  templateUrl: './buy-skin.component.html',
  styleUrls: ['./buy-skin.component.css']
})

@Injectable({ providedIn: 'root' })
export class BuySkinComponent {
  player: Player;
  activeSkins: Skin[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService, private skinSelectedService: SkinSelectedService) {
    this.player = this.session.getPlayerInSession();
  }

  buySkin() {
    const idSkin = this.skinSelectedService.getSkin().idSkin;
    const idplayer = this.session.getPlayerInSession().idplayer;

    if (this.player.myChampies >= this.skinSelectedService.getSkin().champiesCost && this.player.xp >= this.skinSelectedService.getSkin().minXP) {
      this.http.post<any>('http://localhost:8085/closet/Create?idSkinFK=' + idSkin + '&idPlayerFk=' + idplayer + '&status=' + status.Active,
        {
          idSkin,
          idplayer,
          status
        }
      ).subscribe();

      const myChampiesAfterBuyingSkin = Number(this.player.myChampies) - Number(this.skinSelectedService.getSkin().champiesCost);

      this.http.post<any>('http://localhost:8085/players/Update?idPlayer=' + this.player.idplayer + '&idGuildFK= &userName= &email= &password= &gender= &userType= &xp= &champiesToGive= &myChampies=' + myChampiesAfterBuyingSkin + '&status= ', {}).subscribe();

      this.http.get<Skin[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + idplayer, {}).subscribe(
        resData => {
          this.activeSkins = resData;
        
        }
      );

      for (let activeSkin of this.activeSkins) {
        if (activeSkin.skinType === this.skinSelectedService.getSkin().skinType) {
          this.http.post<any>('http://localhost:8085/closet/Update?idSkinFK=' + activeSkin.idSkin + '&idPlayerFk=' + idplayer + '&status=' + status.Inactive, {});
        }
      }
    }
  }
}