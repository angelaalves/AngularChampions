import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.css']
})

@Injectable({ providedIn: "root" })
export class UserLoggedComponent implements OnInit {

  @Input() player: Player;

  constructor() {

  }
  getPlayer() {
    return this.player;
  }
  ngOnInit() {

  }
}