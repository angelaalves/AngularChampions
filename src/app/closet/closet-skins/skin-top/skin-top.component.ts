import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-skin-top',
  templateUrl: './skin-top.component.html',
  styleUrls: ['./skin-top.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinTopComponent implements OnInit {
  @Input() tops: Skin[];
  @Input() player: Player;
  currentUserSkins: Skin[];

  constructor(private session: SessionService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    console.log(this.player);
  }

  skinSelected(skinIn: Skin) {

    this.http.get<Skin[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + this.player.idplayer, {}).subscribe(data => {
      this.currentUserSkins = data;
      console.log(this.currentUserSkins);
      let counter = -1;
      for (let skin of this.currentUserSkins) {
        counter++;
        if (skin.skinType == skinIn.skinType) {
          this.currentUserSkins.splice(counter, 1, skin);
          console.log(this.currentUserSkins);
        }
      }
    });

    this.router.navigate(['../buy_skin'], { relativeTo: this.route });
  }
}