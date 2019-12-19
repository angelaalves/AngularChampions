import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { userType } from 'src/app/shared/userType.enum';
import { Player } from 'src/app/shared/player.model';
import { UserLoggedComponent } from 'src/app/user-logged/user-logged.component';

@Component({
  selector: 'app-warrior-details-xp',
  templateUrl: './warrior-details-xp.component.html',
  styleUrls: ['./warrior-details-xp.component.css']
})


@Injectable({ providedIn: 'root' })
export class WarriorDetailsXPComponent implements OnInit {
  @Input() XP:number;
  constructor(private userlogged: UserLoggedComponent,private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
   // this.warrior= this.userlogged.player;
  }

}