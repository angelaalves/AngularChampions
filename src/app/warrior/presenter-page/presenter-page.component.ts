import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { playerType } from 'src/app/shared/playerType.enum';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-presenter-page',
  templateUrl: './presenter-page.component.html',
  styleUrls: ['./presenter-page.component.css']
})
export class PresenterPageComponent implements OnInit {
  @Input() warrior: Player;
  id: number;
  
  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
  }
}