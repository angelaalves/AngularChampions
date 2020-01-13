import { Component, OnInit, Input, Output, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-guild-master',
  templateUrl: './guild-master.component.html',
  styleUrls: ['./guild-master.component.css']
})

@Injectable({ providedIn: 'root' })
export class GuildMasterComponent implements OnInit {
  @Input() email: string;
  @Output() guildmaster: Player;
  id: number;

  constructor(private session: SessionService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.guildmaster = this.session.getPlayerInSession();
  }
}