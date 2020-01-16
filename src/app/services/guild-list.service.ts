import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';
import { Guild } from '../shared/guild.model';
import { tap } from 'rxjs/operators';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

@Injectable({ providedIn: 'root' })
export class GuildListService implements OnInit {

    private guilds: Guild[] = [];

    constructor(private http: HttpClient, private playerService: PlayerService, private configuration: AppConfigurationsComponent) { }

    ngOnInit() {
        this.http.get<Guild[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/guild/getAll').subscribe(resData => {
            this.guilds = resData;
            for (let guild of this.guilds) {
                this.http.get<String>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/guildPlayers/getGuildMaster?idGuild=' + guild.idguild).subscribe(guildMasterId => {
                    guild.guildmaster = this.playerService.getGuildMaster(guildMasterId)
                })
                this.http.get<String[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/guildPlayers/getMembers?idGuild=' + guild.idguild).subscribe(membersIds => {
                    guild.members = this.playerService.getGuildWarriors(membersIds)
                })
            }
        });
    }

    getGuild(id: String) {
        for (let guild of this.guilds) {
            if (guild.idguild == id) {
                return guild;
            }
        }
    }
    getGuilds() {
        return this.guilds;
    }
    getGuildsFromDataBase() {
        return this.http.get<Guild[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/guild/getAll').pipe(tap(resData => {
            this.guilds = resData;
            for (let guild of this.guilds) {
                this.http.get<String>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/guildPlayers/getGuildMaster?idGuild=' + guild.idguild).subscribe(guildMasterId => {
                    guild.guildmaster = this.playerService.getGuildMaster(guildMasterId)
                })
                this.http.get<String[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/guildPlayers/getMembers?idGuild=' + guild.idguild).subscribe(membersIds => {
                    guild.members = this.playerService.getGuildWarriors(membersIds)
                })
            }
        }))
    }

    getGuildByPlayer(idplayer: String) {
        if (this.guilds.length < 0) {
            this.getGuildsFromDataBase().subscribe(resData => {
                this.guilds = resData;
            });
        }
        for (let guild of this.guilds) {
            for (let member of guild.members) {
                if (member.idplayer == idplayer) {
                    return guild;
                }
            }
        }
    }
}