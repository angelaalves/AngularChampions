import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { playerType } from 'src/app/shared/playerType.enum';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-warrior-details-xp',
  templateUrl: './warrior-details-xp.component.html',
  styleUrls: ['./warrior-details-xp.component.css']
})
export class WarriorDetailsXPComponent implements OnInit {
  @Input() XP:number;
  id: number;
  warrior: Player;
  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
  }

}