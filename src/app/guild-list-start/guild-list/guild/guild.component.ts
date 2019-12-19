import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { Guild } from '../guild.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GuildListService } from 'src/app/services/guild-list.service';
import { SessionService } from 'src/app/services/session.service';
import { userType } from 'src/app/shared/userType.enum';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
  players: Player[];
  guildmaster: Player;
  guild: Guild;
  id: number;

  constructor(private guildListService: GuildListService, private route: ActivatedRoute, private session: SessionService) { }

  ngOnInit() {
    this.guild=this.guildListService.getGuild(this.route.snapshot.params['idguild'])
    this.guildmaster=this.guild.guildmaster
    this.players=this.guild.members
    for(let player of this.players){
      
    }
  }
}