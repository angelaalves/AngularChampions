import { Component, OnInit, Input, Injectable } from '@angular/core';
import { gender } from '../shared/playerGender.enum';
import { userType } from '../shared/playerType.enum';
import { LoginComponent } from 'src/app/login/login.component';
import { Player } from 'src/app/shared/player.model';

import { status } from 'src/app/shared/status.enum';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.css']
})

@Injectable({providedIn:"root"})
export class UserLoggedComponent implements OnInit {

@Input() player:Player;

  constructor( ) {
    
 }
  getPlayer(){
    return this.player;
  }
    ngOnInit() {
      
  }

}
