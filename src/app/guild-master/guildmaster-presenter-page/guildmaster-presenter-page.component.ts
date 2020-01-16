import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private session: SessionService, private configuration: AppConfigurationsComponent) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    const idplayer = this.session.getPlayerInSession().idplayer;
    this.http.get<String[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/activeSkins?idPlayerFK=' + idplayer, {}).subscribe(data => {
      this.activeSkins = data;
    });
  }
}