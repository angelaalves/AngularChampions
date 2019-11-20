import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { userType } from 'src/app/shared/userType.enum';
import { gender } from 'src/app/shared/playerGender.enum';
import { status } from 'src/app/shared/status.enum';
import { LoginComponent } from 'src/app/login/login.component';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-ancient',
  templateUrl: './ancient.component.html',
  styleUrls: ['./ancient.component.css']
})

@Injectable({ providedIn: 'root' })
export class AncientComponent implements OnInit {
  ancient: Player;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService, private session: SessionService) { }

  ngOnInit() {
 console.log("No ancient userlogged= ");
 console.log(this.session.getPlayerInSession());
 this.ancient= this.session.getPlayerInSession();
 
 console.log("ancient = ");
 console.log(this.ancient);
      
  }

}