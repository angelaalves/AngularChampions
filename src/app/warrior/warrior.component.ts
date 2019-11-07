import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/player.model';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-warrior',
  templateUrl: './warrior.component.html',
  styleUrls: ['./warrior.component.css']
})
export class WarriorComponent implements OnInit {
  warrior: Player;
  id: number;
  constructor(private playerService: PlayerService) { }

  ngOnInit() {
  }
}