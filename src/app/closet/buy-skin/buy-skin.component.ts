import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { status } from '../../shared/status.enum';
import { SessionService } from 'src/app/services/session.service';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { SkinSelectedService } from '../closet-skins/skinSelected.service';
import { SkinService } from 'src/app/services/skin.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  closeResult: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService,
    private skinSelectedService: SkinSelectedService, private skinService: SkinService, private modalService: NgbModal) {
    this.player = this.session.getPlayerInSession();
  }

  ngOnInit() {
    this.skinService.shoppingCartSkins.subscribe(shoppingCart => this.shoppingCartSkins = shoppingCart);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  redirectBackToCloset() {
    this.router.navigate(['../closet'], { relativeTo: this.route });
  }

  removeItem(skin: Skin) {
    this.skinService.removeFromShoppingCart(skin);
  }

  emptyCart() {
    this.skinService.emptyCart();
    this.redirectBackToCloset();
  }

  buySkin() {
    console.log("shopping cart skins " + this.shoppingCartSkins);

    const idplayer = this.session.getPlayerInSession().idplayer;

    for (let item of this.shoppingCartSkins) {

      var idSkin = item.idskin;

      console.log("idSkin " + idSkin);

      if (this.player.myChampies >= item.champiesCost && this.player.xp >= item.minXP) {
        this.http.post<any>('http://localhost:8085/closet/Create?idSkinFK=' + idSkin + '&idPlayerFk=' + idplayer + '&status=',
          {
            idSkin,
            idplayer,
          }
        ).subscribe();

        this.activeSkins.push(item);

        const myChampiesAfterBuyingSkin = Number(this.player.myChampies) - Number(item.champiesCost);

        this.http.post<any>('http://localhost:8085/players/Update?idPlayer=' + idplayer + '&idGuildFK= &userName= &email= &password= &gender= &userType= &xp= &champiesToGive= &myChampies=' + myChampiesAfterBuyingSkin + '&status= ',
          {
            idplayer,
            myChampiesAfterBuyingSkin
          }
        ).subscribe();

        let counter: number = -1;
        for (let activeSkin of this.activeSkins) {
          counter++;
          const skinID = activeSkin.idskin;
          const skinStatus = status.Inactive;
          if (activeSkin.skinType === item.skinType) {
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
    }
    //this.router.navigate(['../closet'], { relativeTo: this.route });
  }
}