import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-presenter-page',
  templateUrl: './presenter-page.component.html',
  styleUrls: ['./presenter-page.component.css']
})

@Injectable({ providedIn: 'root' })
export class PresenterPageComponent implements OnInit {
  @Input() warrior: Player;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService, private session: SessionService) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }
}