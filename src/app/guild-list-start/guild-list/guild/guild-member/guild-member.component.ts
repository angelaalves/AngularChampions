import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guild-member',
  templateUrl: './guild-member.component.html',
  styleUrls: ['./guild-member.component.css']
})
export class GuildMemberComponent implements OnInit {
  @Input() player: Player;
  @Input() index: String;
  @Input() isChampion=false;
  constructor() { }

  ngOnInit() {
    //this.player=this.playerService.getPlayer(this.route.snapshot.params['idguild'])
  }

}