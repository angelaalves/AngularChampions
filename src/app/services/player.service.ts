import { Player } from '../shared/player.model';
import { playerType } from '../shared/playerType.enum';
import { Injectable } from '@angular/core';
import { gender } from '../shared/playerGender.enum';
import { status } from 'src/app/shared/status.enum';

 
@Injectable()
export class PlayerService{
    imagePath: string[]=["../assets/Hair/HairMediumBlonde.png", 
    "../assets/SkinColor/FemaleWhite.png",
    "../assets/Top/TopPolarBlack.png",
    "../assets/Bottom/BottomTrouseWhite.png",
    "../assets/Shoes/ShoesGrey.png",
    "../assets/Others/FairyWings.png"
]
    players: Player[]=[
        new Player('1','1','One', '123@123.com', '12345', this.imagePath, '100','100','100',playerType.Warrior, gender.Male, status.Active),
        new Player('3','1','ancient', '456@456.com', '234567', this.imagePath, '100','100','100',playerType.Ancient, gender.Female,status.Active),
        new Player('2','2','Two', '123@123.com', '12345', this.imagePath, '100','100','100',playerType.Warrior, gender.Female,status.Active)
    ];
 
    constructor(){}
 
    getPlayers(){
        return this.players;
    }
    getWarriors(){
        /*
        this.http.post<any>('http://localhost:8085/players/Login', { email, password }).pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
            }
            return user;
        }
      */
    }
    getGuildMaster(){
        var guildmasters: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].playerType==playerType.GuildMaster){
                guildmasters.push(this.players[i]);
            }
        }
        return guildmasters;
    }
    getAncient(){
        var guildmasters: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].playerType==playerType.GuildMaster){
                guildmasters.push(this.players[i]);
            }
        }
        return guildmasters;
    }
 
    getPlayer(index: number){
        return this.players[index];
    }
 
    addPlayer(player: Player){
        this.players.push(player);
    }
 
    getPlayerType(index: number){
        return this.players[index].playerType;
    }
}