import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { userType } from 'src/app/shared/userType.enum';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-presenter-page',
  templateUrl: './presenter-page.component.html',
  styleUrls: ['./presenter-page.component.css']
})

@Injectable({ providedIn: 'root' })
export class PresenterPageComponent implements OnInit {
  @Input() warrior: Player;
  id: number;
  
  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id= +params['id'];
      /*for(let i=0;i<this.playerService.getPlayers().length;i++){
        if(this.playerService.getPlayerType(i)==playerType.Ancient){
          this.warrior=this.playerService.getPlayer(this.id);
        }
      }*/
    });
  }
}