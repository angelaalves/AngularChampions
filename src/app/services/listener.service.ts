import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { NotificationsReceivers } from '../shared/notificationsReceivers.model';
import { SessionService } from './session.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

@Injectable({providedIn:'root'})
export class ListenerService{
    public ping: Subject<any>=new Subject();

    constructor(private http: HttpClient, private playerSession: SessionService, private configuration: AppConfigurationsComponent){}

    listen(){
        return this.http.get('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/notificationreceivers/Get?idPlayerReceiverFK='+ this.playerSession.getPlayerInSession().idplayer).pipe(map((res)=> this.ping.next(res)));
        
    }
}