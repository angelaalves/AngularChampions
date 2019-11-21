import { Component, OnInit, Input, Injectable } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-warrior-details',
  templateUrl: './warrior-details.component.html',
  styleUrls: ['./warrior-details.component.css']
})



@Injectable({ providedIn: 'root' })
export class WarriorDetailsComponent implements OnInit {
  @Input() XP:number;
  @Input() coinsGive:number;
  @Input() coinsReceive:number;
  warrior:Player
  constructor(private session:SessionService) { 

  }

  ngOnInit() {
     this.warrior=this.session.getPlayerInSession();
     
  }

}