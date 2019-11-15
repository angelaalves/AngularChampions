import { Component, OnInit, Input } from '@angular/core';
import { gender } from '../shared/playerGender.enum';
import { playerType } from '../shared/playerType.enum';
import { LoginComponent } from 'src/app/login/login.component';
import { Player } from 'src/app/shared/player.model';

import { status } from 'src/app/shared/status.enum';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.css']
})
export class UserLoggedComponent implements OnInit {
/*
@Input() idPlayer: string;
@Input() idGuild:string;
@Input() UserName: string;
@Input() email:string;
@Input() gender: gender;
@Input() playerType: playerType;
@Input() XP:string;
@Input() ChampiesToGive:string;
@Input() MyChampies:string;
@Input() Status:string;
@Input() password: string;
@Input() imagePath: string[];
@Input() status: status;
*/
@Input() player:Player;

  constructor( ) {
 }
  getPlayer(){
    return this.player;
  }
    ngOnInit() {
      
  }

}
