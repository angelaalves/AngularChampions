import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { NotificationsReceivers } from '../shared/notificationsReceivers.model';
import { SessionService } from './session.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class ListenerService{
    public ping: Subject<any>=new Subject();

    constructor(private http: HttpClient, private playerSession: SessionService){}

    listen(){
        return this.http.get('http://localhost:8189/notificationreceivers/Get?idPlayerReceiverFK='+ this.playerSession.getPlayerInSession().idplayer).pipe(map((res)=> this.ping.next(res)));
        
    }
}