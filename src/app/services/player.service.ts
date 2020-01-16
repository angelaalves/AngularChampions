import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { watchedVideos } from '../shared/watchedVideos.model';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

@Injectable({ providedIn: 'root' })
export class PlayerService {

    players: Player[] = [];
    ancients: Player[] = [];
    warriors: Player[] = [];
    guildmasters: Player[] = [];
    watchedvideos: watchedVideos[] = [];

    constructor(private http: HttpClient, private configuration: AppConfigurationsComponent) {
        this.getPlayers();
    }

    getPlayers() {
        return this.http.get<Player[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/getAll', {}).subscribe(data => {
            this.players = data;
            for (let i = 0; i < this.players.length; i++) {
                this.http.get<String[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/activeSkins?idPlayerFK=' + this.players[i].idplayer).subscribe(response => {
                    this.players[i].imagePath = response;
                    if (this.players[i].userType == userType.Warrior) {
                        this.warriors.push(this.players[i]);
                    }
                    if (this.players[i].userType == userType.GuildMaster) {
                        this.guildmasters.push(this.players[i]);
                    }
                    if (this.players[i].userType == userType.Ancient) {
                        this.ancients.push(this.players[i]);
                    }
                })
            }
        })
    }

    getPlayer(id: String) {
        for(let player of this.players){
            if(player.idplayer==id){
                return player
            }
        }
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }

    getPlayerType(index: number) {
        return this.players[index].userType;
    }

    getWatchedVideos(player: Player) {
        this.http.get<watchedVideos[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/watchedVideos/get?idPlayerFK=' + player.idplayer, {}).subscribe(data => {
            this.watchedvideos = data;
        });
    }
    getActiveSkins(idplayer: String) {
        this.http.get<string[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/activeSkins?idPlayerFK=' + idplayer).subscribe(data => {
            return data;
        })
    }

    getListOfPlayers() {
        return this.players;
    }

    getWarriors() {
        return this.warriors;
    }
    getGuildMasters() {
        return this.guildmasters;
    }
    getAncients() {
        return this.ancients;
    }

    getGuildMaster(id: String) {
        for (let guildMaster of this.guildmasters) {
            if (guildMaster.idplayer == id) {
                return guildMaster;
            }
        }
    }
    getGuildWarriors(ids: String[]) {
        var selectedWarriors: Player[] = [];
        for (let id of ids) {
            for (let warrior of this.warriors) {
                if (warrior.idplayer == id) {
                    selectedWarriors.push(warrior)
                }
            }
        }
        return selectedWarriors
    }
}