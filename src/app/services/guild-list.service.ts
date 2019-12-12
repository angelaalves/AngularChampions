import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../shared/player.model';
import { PlayerService } from './player.service';
import { Guild } from '../guild-list-start/guild-list/guild.model';
import { gender } from '../shared/playerGender.enum';
import { status } from '../shared/status.enum';

@Injectable({providedIn: 'root'})
export class GuildListService implements OnInit{
    
   private guilds: Guild[]; 
    constructor(private http: HttpClient, private playerService: PlayerService){
        this.http.get<Guild[]>('http://localhost:8085/guild/getAll').subscribe(resData=>{
            this.guilds=resData;
        });
    }

    ngOnInit(){
       
    }

    getGuild(index:number){
        return this.guilds[index];
    }
    getGuilds(){
        return this.guilds;
    }
    getGuildPlayers(index:number){
        return this.guilds[index].getPlayers();
    }
    
}