import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { userType } from '../shared/userType.enum';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-guild-master',
  templateUrl: './guild-master.component.html',
  styleUrls: ['./guild-master.component.css']
})
export class GuildMasterComponent implements OnInit {
  guildmaster: Player;
  id: number;
  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService, private session: SessionService) { 
    this.guildmaster=session.getPlayerInSession();
  }
 
  @Input() name: string
  @Input() hairImagePath: string
  @Input() skinImagePath: string
  @Input() shirtImagePath: string
  @Input() pantsImagePath: string
  @Input() shoesImagePath: string
  @Input() othersImagePath: string

  ngOnInit() {
    
    this.route.params.subscribe((params: Params)=>{
      this.id= +params['id'];
    
    });
  }
}