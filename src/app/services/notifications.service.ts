import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SessionService } from './session.service';


@Injectable({providedIn: 'root'})
export class NotificationsService{
    public notifications: Subject<any> =new Subject();

    constructor(private http: HttpClient, private sessionService: SessionService){}

    fetchNotifications(email){
        const from=this.sessionService.getPlayerInSession().email
        return this.http.get('http://localhost:8085/Notifications/send')
    }
}