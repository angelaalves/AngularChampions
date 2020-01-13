import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { GuildListService } from 'src/app/services/guild-list.service';
import { ActivatedRoute } from '@angular/router';
import { playerType } from 'src/app/shared/playerType.enum';

@Component({
  selector: 'app-guild-member',
  templateUrl: './guild-member.component.html',
  styleUrls: ['./guild-member.component.css']
})
export class GuildMemberComponent implements OnInit {
  @Input() player: Player;
  @Input() index: String;
  champion: Player;
  players: Player[];

  constructor(private guildListService: GuildListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.players = this.guildListService.getGuild(this.route.snapshot.params['idguild']).getPlayers();
    this.champion = this.players[0];
    this.players.forEach(player => {
      if (Number(this.champion.xp) < Number(player.xp)) {
        this.champion = player;
      } else if (Number(this.champion.xp) == Number(player.xp)) {
        if (Number(this.champion.myChampies) == Number(player.myChampies)) {
          if (Number(this.champion.champiesToGive) > Number(player.champiesToGive)) {
            this.champion = player;
          }
        } else if (Number(this.champion.myChampies) < Number(player.myChampies)) {
          this.champion = player;
        }
      }
    });
  }

  isChampion(player: Player) {
    if(this.champion==player){
      return true;
    }
    return false;
  }
}