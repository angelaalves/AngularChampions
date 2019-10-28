import { Component, OnInit, Input } from '@angular/core';
import { Guild } from '../guild.model';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-guild-list-elem',
  templateUrl: './guild-list-elem.component.html',
  styleUrls: ['./guild-list-elem.component.css']
})
export class GuildListElemComponent implements OnInit {
  @Input() players: Player;
  @Input() guild: Guild;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}