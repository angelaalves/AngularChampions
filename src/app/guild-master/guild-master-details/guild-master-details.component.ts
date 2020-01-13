import { Component, Input, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { SessionService } from 'src/app/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guild-master-details',
  templateUrl: './guild-master-details.component.html',
  styleUrls: ['./guild-master-details.component.css']
})

@Injectable({ providedIn: 'root' })
export class GuildMasterDetailsComponent {
  @Input() XP: number;
  @Input() coinsGive: number;
  @Input() coinsReceive: number;
  @Input() guildmaster: Player;

  constructor(private session: SessionService, private router: Router, private route: ActivatedRoute) { }
}