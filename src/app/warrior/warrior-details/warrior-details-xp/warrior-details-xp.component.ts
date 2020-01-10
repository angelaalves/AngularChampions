import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/shared/player.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-warrior-details-xp',
  templateUrl: './warrior-details-xp.component.html',
  styleUrls: ['./warrior-details-xp.component.css']
})


export class WarriorDetailsXPComponent implements OnInit {
  @Input() XP:number;
  barXP:number;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.percentageXP();
  }
  percentageXP(){
    this.barXP=this.XP/1000;
 
 
  }
}
