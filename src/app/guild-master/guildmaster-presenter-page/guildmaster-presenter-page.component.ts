import { Component, OnInit, Injectable, Input } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-guildmaster-presenter-page',
  templateUrl: './guildmaster-presenter-page.component.html',
  styleUrls: ['./guildmaster-presenter-page.component.css']
})

@Injectable({ providedIn: 'root' })
export class GuildmasterPresenterPageComponent implements OnInit {
  @Input() guildmaster: Player;
  id: number;
  
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }
}