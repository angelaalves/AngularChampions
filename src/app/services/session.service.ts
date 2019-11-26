import { Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { LoginComponent } from '../login/login.component';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SessionService {
    playerSession: Player;
    login: LoginComponent;
    constructor() {
    }


    openSession(player:Player){
        this.playerSession=player; 
    }
    
    closeSession(){
        this.playerSession=null;
    }

    getPlayerInSession(): Player {
        return this.playerSession;
    }

}