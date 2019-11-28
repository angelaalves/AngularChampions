import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { watchedVideos } from '../shared/watchedVideos.model';

@Injectable()
export class PlayerService {

    players: Player[];
    ancients: Player[] = [];
    warriors: Player[] = [];
    guildmasters: Player[] = [];
 
    constructor(private http:HttpClient){}
 
    getPlayers(){
    watchedvideos: watchedVideos[];

        return this.http.get<Player[]>('http://localhost:8085/players/getAll', {}).subscribe(data => {
            console.log(data);
            this.players=data; 
            for(let i=0;i<this.players.length;i++){
            if(this.players[i].userType==userType.Warrior){
                this.warriors.push(this.players[i]); 
            }
            if(this.players[i].userType==userType.GuildMaster){
               this.guildmasters.push(this.players[i]);
            }
            if(this.players[i].userType==userType.Ancient){
                this.ancients.push(this.players[i]);
            }
        }
        })
    }


 
    getPlayer(index: number){
        return this.players[index];
    }

    addPlayer(player: Player) {
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
}