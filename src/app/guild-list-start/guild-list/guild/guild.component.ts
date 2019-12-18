import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { Guild } from '../guild.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GuildListService } from 'src/app/services/guild-list.service';

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

  constructor(private guildListService: GuildListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.guild=this.guildListService.getGuild(this.route.snapshot.params['idguild'])
    console.log(this.guild)
    this.guildmaster=this.guild.guildmaster
    this.players=this.guild.members
  }
}