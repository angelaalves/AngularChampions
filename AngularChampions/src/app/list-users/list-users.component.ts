import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  @Input() players: Player[];

  constructor(private playerService:PlayerService) { }

  ngOnInit() {
   this.players=this.playerService.players;
  }

}