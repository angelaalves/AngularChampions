import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { status } from '../../shared/status.enum';
import { SessionService } from 'src/app/services/session.service';
import { Skin } from 'src/app/shared/skin.model';

@Component({
  selector: 'app-buy-skin',
  templateUrl: './buy-skin.component.html',
  styleUrls: ['./buy-skin.component.css']
})

@Injectable({ providedIn: 'root' })
export class BuySkinComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService, private skin: Skin) { }

  ngOnInit() {
  }

  buySkin() {
    const idSkin = this.skin.idSkin;
    const idplayer = this.session.getPlayerInSession().idplayer;

    this.http.post<any>('http://localhost:8085/closet/Create?idSkinFK=' + idSkin + '&idPlayerFk=' + idplayer + '&status=' + status.Active,
      {
        idSkin,
        idplayer,
        status
      }
    ).subscribe();
  }
}