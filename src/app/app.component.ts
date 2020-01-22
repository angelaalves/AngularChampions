import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { Player } from './shared/player.model';
import { GuildListService } from './services/guild-list.service';
import { PlayerService } from './services/player.service';
import { AppConfigurationsComponent } from './app-configurations/app-configurations.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project-Champions';

  constructor(private session: SessionService, private guildService: GuildListService, private playerService: PlayerService, private configService: AppConfigurationsComponent) {
    this.configService.configurationsReader(); 
  }

  ngOnInit() {
    const playerData: Player = JSON.parse(localStorage.getItem('playerlogged'));
    if (!playerData) {
      return;
    } else {
      const player = new Player(playerData.idplayer, playerData.userName, playerData.email, playerData.password, playerData.imagePath, playerData.xp, playerData.champiesToGive, playerData.myChampies, playerData.userType, playerData.gender, playerData.status);
      this.session.openSession(player);
    }
    this.playerService
    this.guildService.ngOnInit();
    
  }
}