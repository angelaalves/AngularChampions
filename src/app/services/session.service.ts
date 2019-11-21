import { Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { LoginComponent } from '../login/login.component';

@Injectable({ providedIn: 'root' })
export class SessionService {
    playerSession: Player;
    login: LoginComponent;
    constructor() {
    }

    openSession(player: Player) {
        this.playerSession = player;
        console.log("Session open: ");
        console.log(this.playerSession);
    }

    closeSession() {
        this.playerSession = null;
    }

    getPlayerInSession(): Player {
        return this.playerSession;
        console.log("Session atribute player: " + this.playerSession);
    }

}