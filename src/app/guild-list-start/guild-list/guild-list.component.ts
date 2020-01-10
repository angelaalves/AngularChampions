import { Component, OnInit } from '@angular/core';
import { Guild } from './guild.model';
import { Router, ActivatedRoute } from '@angular/router';
import { GuildListService } from 'src/app/services/guild-list.service';

@Component({
  selector: 'app-guild-list',
  templateUrl: './guild-list.component.html',
  styleUrls: ['./guild-list.component.css']
})

export class GuildListComponent implements OnInit {
  guilds: Guild[] = []

  constructor(private guildListService: GuildListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.guildListService.getGuildsFromDataBase().subscribe(resData => {
      this.guilds = resData;
    });
  }

  onResponse() {
    this.router.navigate(['./add_guild'], { relativeTo: this.route })
  }
}