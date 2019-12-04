import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsReceivers } from '../shared/notificationsReceivers.model';
import { ListenerService } from '../services/listener.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})



@Injectable({ providedIn: 'root' })
export class NotificationsComponent implements OnInit {
public notificationreceiver: NotificationsReceivers[];
public notviewed:Notification[];
public viewed:Notification[];
public notificationEl: NotificationsReceivers;
  constructor(private router: Router, private route: ActivatedRoute,private session: SessionService, private http: HttpClient, private authService: AuthenticationService, private listener: ListenerService) { 
  this.getNotifications();
  }

  ngOnInit() {
    
  }

  redirectToProfile(){
    this.router.navigate(['../ancient_profile'], {relativeTo: this.route});
  }


  getNotifications(){
    this.notviewed=[];
    this.http.get<NotificationsReceivers[]>('http://localhost:8085/notificationreceivers/Get?idPlayerReceiverFK=' + this.session.playerSession.idplayer).subscribe(data => {
      this.notificationreceiver = data;
      
      console.log("notifications");
      console.log(this.notificationreceiver);
      console.log(this.notificationreceiver[0].idnotificationFK)

      for (let notification of this.notificationreceiver) {
        this.notificationEl=notification;
        console.log(notification)
        console.log(this.notificationEl)
        console.log(this.notificationEl.idnotificationFK);
        this.http.get<Notification[]>('http://localhost:8085/notifications/Get?ID_Notification=' + notification.idnotificationFK).subscribe(data => {
          
        //falta a filtragem d o not viwed
        this.notviewed.push(data[0]);
          console.log("notifications not viewed");
          console.log(this.notviewed);
        });
      }

    });
  }
}