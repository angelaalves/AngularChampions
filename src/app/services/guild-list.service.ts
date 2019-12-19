import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';
import { Guild } from '../guild-list-start/guild-list/guild.model';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuildListService implements OnInit {

    private guilds: Guild[] = [];
    constructor(private http: HttpClient, private playerService: PlayerService) {

    }

    ngOnInit() {
        this.http.get<Guild[]>('http://localhost:8085/guild/getAll').subscribe(resData => {
            this.guilds = resData;
            for (let guild of this.guilds) {
                this.http.get<String>('http://localhost:8085/guildPlayers/getGuildMaster?idGuild=' + guild.idguild).subscribe(guildMasterId => {
                    guild.guildmaster = this.playerService.getGuildMaster(guildMasterId)
                })
                this.http.get<String[]>('http://localhost:8085/guildPlayers/getMembers?idGuild=' + guild.idguild).subscribe(membersIds => {
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
        return this.http.get<Guild[]>('http://localhost:8085/guild/getAll').pipe(tap(resData => {
            this.guilds = resData;
            for (let guild of this.guilds) {
                this.http.get<String>('http://localhost:8085/guildPlayers/getGuildMaster?idGuild=' + guild.idguild).subscribe(guildMasterId => {
                    guild.guildmaster = this.playerService.getGuildMaster(guildMasterId)
                })
                this.http.get<String[]>('http://localhost:8085/guildPlayers/getMembers?idGuild=' + guild.idguild).subscribe(membersIds => {
                    guild.members = this.playerService.getGuildWarriors(membersIds)
                })
            }
        }))
    }
    getGuildPlayers(index: number) {
        return this.guilds[index].getPlayers();
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