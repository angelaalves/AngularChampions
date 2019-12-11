import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { status } from '../../shared/status.enum';
import { SessionService } from 'src/app/services/session.service';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { SkinSelectedService } from '../closet-skins/skinSelected.service';
import { SkinService } from 'src/app/services/skin.service';

@Component({
  selector: 'app-buy-skin',
  templateUrl: './buy-skin.component.html',
  styleUrls: ['./buy-skin.component.css']
})

@Injectable({ providedIn: 'root' })
export class BuySkinComponent implements OnInit {
  player: Player;
  activeSkins: Skin[] = [];
  currentSkinToBeBought: Skin;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService,
    private skinSelectedService: SkinSelectedService, private skinService: SkinService) {
    this.player = this.session.getPlayerInSession();
  }

  ngOnInit() {
    this.skinService.currentSkinSelected.subscribe(skin =>{ this.currentSkinToBeBought = skin})
    console.log(this.currentSkinToBeBought);
  }

  redirectBackToCloset() {
    this.router.navigate(['../closet'], { relativeTo: this.route });
  }

  buySkin() {
    console.log(this.currentSkinToBeBought);
    var idSkin = this.currentSkinToBeBought.idskin;
    console.log("idSkin "+ idSkin);
    const idplayer = this.session.getPlayerInSession().idplayer;

    if (this.player.myChampies >= this.currentSkinToBeBought.champiesCost && this.player.xp >= this.currentSkinToBeBought.minXP) {
      this.http.post<any>('http://localhost:8085/closet/Create?idSkinFK=' + idSkin + '&idPlayerFk=' + idplayer + '&status=',
        {
          idSkin,
          idplayer,
        }
      ).subscribe();

      this.activeSkins.push(this.currentSkinToBeBought);

      const myChampiesAfterBuyingSkin = Number(this.player.myChampies) - Number(this.currentSkinToBeBought.champiesCost);

      this.http.post<any>('http://localhost:8085/players/Update?idPlayer=' + idplayer + '&idGuildFK= &userName= &email= &password= &gender= &userType= &xp= &champiesToGive= &myChampies=' + myChampiesAfterBuyingSkin + '&status= ',
        {
          idplayer,
          myChampiesAfterBuyingSkin
        }
      ).subscribe();

      for (let activeSkin of this.activeSkins) {
        const skinID = activeSkin.idskin;
        const skinStatus = status.Inactive;
        if (activeSkin.skinType === this.skinSelectedService.getSkin().skinType) {
          this.http.post<any>('http://localhost:8085/closet/Update?idSkinFK=' + skinID + '&idPlayerFk=' + idplayer + '&status=' + skinStatus,
            {
              skinID,
              idplayer,
              skinStatus
            }
          );
        }
      }
    }
    this.router.navigate(['../closet'], { relativeTo: this.route });
  }
}