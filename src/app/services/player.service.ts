import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { watchedVideos } from '../shared/watchedVideos.model';

@Injectable({ providedIn: 'root' })
export class PlayerService {

    players: Player[] = [];
    ancients: Player[] = [];
    warriors: Player[] = [];
    guildmasters: Player[] = [];
    watchedvideos: watchedVideos[] = [];

    constructor(private http: HttpClient) {
        this.getPlayers();
    }

    getPlayers() {
        return this.http.get<Player[]>('http://localhost:8085/players/getAll', {}).subscribe(data => {
            this.players = data;
            for (let i = 0; i < this.players.length; i++) {
                this.http.get<String[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + this.players[i].idplayer).subscribe(response => {
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

    getPlayer(index: number) {
        return this.players[index];
    }

    addPlayer(player: Player) {
        console.log(player);
        this.players.push(player);
    }

    getPlayerType(index: number) {
        return this.players[index].userType;
    }

    getWatchedVideos(player: Player) {
        this.http.get<watchedVideos[]>('http://localhost:8085/watchedVideos/get?idPlayerFK=' + player.idplayer, {}).subscribe(data => {
            console.log(data);
            this.watchedvideos = data;
        });
    }
    getActiveSkins(idplayer: String) {
        this.http.get<string[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + idplayer).subscribe(data => {
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
}