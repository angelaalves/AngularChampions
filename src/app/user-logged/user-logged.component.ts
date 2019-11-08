import { Component, OnInit, Input } from '@angular/core';
import { gender } from '../shared/playerGender.enum';
import { playerType } from '../shared/playerType.enum';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.css']
})
export class UserLoggedComponent implements OnInit {

@Input() idPlayer: string;
@Input() idGuild:string;
@Input() UserName: string;
@Input() email:string;
@Input() gender: gender;
@Input() userType: playerType;
@Input() XP:string;
@Input() ChampiesToGive:string;
@Input() MyChampies:string;
@Input() Status:string;




  constructor() { }

  ngOnInit() {
  }

}
