import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-guild-player-presenter',
  templateUrl: './guild-player-presenter.component.html',
  styleUrls: ['./guild-player-presenter.component.css']
})
export class GuildPlayerPresenterComponent implements OnInit {
  @Input() player: Player
  constructor() { 
    
  }

  ngOnInit() {
  }

}
