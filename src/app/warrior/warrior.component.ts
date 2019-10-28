import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Player } from '../shared/player.model';
import { PlayerService } from '../services/player.service';
import { playerType } from '../shared/playerType.enum';

@Component({
  selector: 'app-warrior',
  templateUrl: './warrior.component.html',
  styleUrls: ['./warrior.component.css']
})
export class WarriorComponent implements OnInit {
  warrior: Player;
  id: number;
  constructor(private router:Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    
  }
}