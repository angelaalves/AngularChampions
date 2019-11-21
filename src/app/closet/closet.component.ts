import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { SessionService } from '../services/session.service';

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

  constructor(private session: SessionService, private http: HttpClient, private authService: AuthenticationService) { }

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

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    this.getSkins();
  }
}