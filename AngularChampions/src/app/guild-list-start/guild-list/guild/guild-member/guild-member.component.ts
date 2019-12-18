import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-guild-member',
  templateUrl: './guild-member.component.html',
  styleUrls: ['./guild-member.component.css']
})
export class GuildMemberComponent implements OnInit {
  @Input() player: Player;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}