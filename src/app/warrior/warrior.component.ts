import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from '../services/session.service';
import { playerType } from '../shared/playerType.enum';

@Component({
  selector: 'app-warrior',
  templateUrl: './warrior.component.html',
  styleUrls: ['./warrior.component.css']
})
export class WarriorComponent implements OnInit {
  @Input() email:string;
  warrior: Player;
  id: number;
  constructor(private router: Router, private route: ActivatedRoute, private sessionPlayer: SessionService) { }

  ngOnInit() {
    if(this.sessionPlayer.getPlayerInSession().playerType===playerType.Warrior){
      this.warrior=this.sessionPlayer.getPlayerInSession();
      console.log(this.warrior);
    }
  }
}