import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { Guild } from '../guild.model';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { GuildListService } from 'src/app/services/guild-list.service';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {
  players: Player[];
  guildmaster: Player;
  guild: Guild;
  id: number;
  profile;
  upcomingEvents;

  constructor(private guildListService: GuildListService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id= +params['id'];
      this.guild=this.guildListService.getGuild(this.id);
      this.players= this.guild.getPlayers();
      this.guildmaster=this.guild.getGuildMaster();
    });
    this.profile = document.getElementById("upcomingEvents");
    this.upcomingEvents = document.getElementById("profile");
  }

  showInfo(){
    
    if (this.profile.style.display === "none" && this.upcomingEvents.style.display === "none") {
      this.profile.style.display = "block";
      this.upcomingEvents.style.display = "block";
    } else {
      this.profile.style.display = "none";
      this.upcomingEvents.style.display = "none";
    }
  }
}