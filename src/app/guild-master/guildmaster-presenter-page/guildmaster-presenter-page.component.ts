import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-guildmaster-presenter-page',
  templateUrl: './guildmaster-presenter-page.component.html',
  styleUrls: ['./guildmaster-presenter-page.component.css']
})

@Injectable({ providedIn: 'root' })
export class GuildmasterPresenterPageComponent implements OnInit {
  @Input() guildmaster: Player;
  activeSkins: String[] = [];
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    const idplayer = this.session.getPlayerInSession().idplayer;
    this.http.get<String[]>('http://localhost:8189/closet/activeSkins?idPlayerFK=' + idplayer, {}).subscribe(data => {
      this.activeSkins = data;
      console.log(this.activeSkins);
    });
    console.log("active skins " + this.activeSkins);
  }
}