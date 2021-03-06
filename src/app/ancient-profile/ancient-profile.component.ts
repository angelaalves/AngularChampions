import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { SessionService } from '../services/session.service';
import { ClosetComponent } from '../closet/closet.component';

@Component({
  selector: 'app-ancient-profile',
  templateUrl: './ancient-profile.component.html',
  styleUrls: ['./ancient-profile.component.css']
})

@Injectable({ providedIn: "root" })
export class AncientProfileComponent implements OnInit {

  public ancient: Player;

  constructor(private session: SessionService) { }

  ngOnInit() {
    this.ancient = this.session.getPlayerInSession();
  }
}