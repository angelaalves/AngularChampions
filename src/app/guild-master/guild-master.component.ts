import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { playerType } from '../shared/playerType.enum';

@Component({
  selector: 'app-guild-master',
  templateUrl: './guild-master.component.html',
  styleUrls: ['./guild-master.component.css']
})
export class GuildMasterComponent implements OnInit {
  guildmaster: Player;
  id: number;
  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id= +params['id'];
      for(let i=0;i<this.playerService.getPlayers().length;i++){
        if(this.playerService.getPlayerType(i)===playerType.GuildMaster){
          this.guildmaster=this.playerService.getPlayer(this.id);
        }
      }
    });
  }

}