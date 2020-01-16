import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';


@Injectable({providedIn: 'root'})
export class NotificationsService{
    public notifications: Subject<any> =new Subject();

    constructor(private http: HttpClient, private sessionService: SessionService, private configuration: AppConfigurationsComponent){}

    fetchNotifications(email){
        const from=this.sessionService.getPlayerInSession().email
        return this.http.get('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/Notifications/send')
    }
}