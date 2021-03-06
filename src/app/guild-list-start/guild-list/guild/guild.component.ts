import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { Guild } from '../../../shared/guild.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GuildListService } from 'src/app/services/guild-list.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})

export class GuildComponent implements OnInit {
  players: Player[];
  guildmaster: Player;
  id: number;
  flag: string;
  guild: Guild;
  public events: Event[] = [];
  flags: String[] = ["../../../assets/Flags/flag1.png", "../../../../assets/Flags/flag2.png",
    "../../../../assets/Flags/flag3.png", "../../../../assets/Flags/flag4.png",
    "../../../../assets/Flags/flag5.png", "../../../../assets/Flags/flag6.png",
    "../../../../assets/Flags/flag7.png", "../../../../../assets/Flags/flag8.png",
    "../../../../assets/Flags/flag9.png", "../../../../assets/Flags/flag10.png"];

  constructor(private guildListService: GuildListService, private route: ActivatedRoute, private http: HttpClient, private configuration: AppConfigurationsComponent){ }

  ngOnInit() {
    this.guild = this.guildListService.getGuild(this.route.snapshot.params['idguild']);
    this.guildmaster = this.guild.guildmaster;
    this.players = this.guild.members;
    this.flag = this.guild.guildFlag;
    this.http.get<Event[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/events/getAll').subscribe(data => {
      this.events = data;
      console.log(data);
      console.log(this.events);
    });
  }

  changeFlag(flag: string) {
    this.flag = flag;
    this.http.post('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/guild/Update?idGuild=' + this.guild.idguild + '&guildName=' + this.guild.guildName + '&startDate=' + formatDate(this.guild.startDate, "yyyy-MM-dd", "en-UK") + '&endDate=' + formatDate(this.guild.endDate, "yyyy-MM-dd", "en-UK") + '&guildFlag=' + this.flag + '&status=Active', {}).subscribe();
  }

  chooseFlag(fileInput: File) {
    this.flag = '../../../assets/AppImages/' + fileInput.name; 
  }
}