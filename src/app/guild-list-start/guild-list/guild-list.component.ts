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
  guilds: Guild[];
  modal;
  btn;
  span;

  constructor(private guildListService: GuildListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.guilds=this.guildListService.getGuilds();
    this.modal = document.getElementById("popup");
    this.btn = document.getElementById("delete");
    this.span = document.getElementsByClassName("close")[0];
  }

  onResponse(){
    this.router.navigate(['./add_guild'], {relativeTo: this.route})
  }

  onGuild(index: number){
    console.log(this.guilds[index]);
    this.router.navigate(['./'+index], {relativeTo: this.route});
  }

  delete(){
    if(this.modal.style.display==="block"){
      this.modal.style.display="none";
    }else{
      this.modal.style.display="block";
    }
  }

  spanOnClick(){
    this.modal.style.display = "none";
  }
}