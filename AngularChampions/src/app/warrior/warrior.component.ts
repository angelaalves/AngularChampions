import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from '../services/session.service';
import {userType } from '../shared/userType.enum';
import { UserLoggedComponent } from '../user-logged/user-logged.component';

@Component({
  selector: 'app-warrior',
  templateUrl: './warrior.component.html',
  styleUrls: ['./warrior.component.css']
})

@Injectable({ providedIn: 'root' })
export class WarriorComponent implements OnInit {
  @Input() email:string;
  warrior: Player;
  id: number;
  constructor(private userlogged: UserLoggedComponent,private router: Router, private route: ActivatedRoute, private sessionPlayer: SessionService) { }

  ngOnInit() {
   
    this.warrior= this.userlogged.player;
  }
}