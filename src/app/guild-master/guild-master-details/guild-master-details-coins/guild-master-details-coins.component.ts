import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-guild-master-details-coins',
  templateUrl: './guild-master-details-coins.component.html',
  styleUrls: ['./guild-master-details-coins.component.css']
})
@Injectable({ providedIn: 'root' })
export class GuildMasterDetailsCoinsComponent implements OnInit {

  @Input() coinsGive: number;
  @Input() coinsReceive: number;
  guildMaster: Player;

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.guildMaster = this.session.getPlayerInSession();
  }
}