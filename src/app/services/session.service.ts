import { Injectable, OnInit } from '@angular/core';
import { Player } from '../shared/player.model';
import { LoginComponent } from '../login/login.component';

@Injectable({ providedIn: 'root' })
export class SessionService implements OnInit{
    playerSession: Player;
    login: LoginComponent;
    ngOnInit() {
        /*
        const playerData: Player=JSON.parse(localStorage.getItem('playerslogged'));
        console.log(playerData.imagePath)
        if(!playerData){
            return;
        }
        this.playerSession=new Player(playerData.idplayer, playerData.userName, playerData.email, playerData.password, playerData.imagePath, playerData.xp, playerData.champiesToGive, playerData.myChampies, playerData.userType, playerData.gender, playerData.status)
    */
    }
    
    
    constructor() {
    }

    openSession(player:Player){
        this.playerSession=player; 
    }

    closeSession() {
        this.playerSession = null;
    }

    getPlayerInSession(): Player {
        return this.playerSession;
    }
}