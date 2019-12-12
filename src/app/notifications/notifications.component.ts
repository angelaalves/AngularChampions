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
  public notificationids: String[];
  public notviewed: Notification[];
  public all: Notification[];
  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private http: HttpClient, private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.getNotifications();
  }

  redirectToProfile() {
    //Fazeraqui
    for (let idsofnoti of this.notificationids) {
      console.log("idsofnoti ");
      console.log(idsofnoti);
      this.http.get<NotificationsReceivers[]>('http://localhost:8085/notificationreceivers/Get?ID_Notification_FK=' + idsofnoti).subscribe(dataaux => {
        const notificationnowseen = dataaux[0];
        const idNotificationReceiver = notificationnowseen.idnotificationReceiver;
        console.log("notificationnowseen.idnotificationReceiver");
        console.log(notificationnowseen.idnotificationReceiver);
        const idPlayerReceiverFK = notificationnowseen.idplayerReceiverFK;
        console.log("notificationnowseen.idplayerReceiverFK");
        console.log(notificationnowseen.idplayerReceiverFK);
        const ID_Notification_FK = notificationnowseen.idnotificationFK;
        console.log("notificationnowseen.idnotificationFK");
        console.log(notificationnowseen.idnotificationFK);
        const ID_Guild_FK = notificationnowseen.idguildFK;
        console.log("notificationnowseen.idguildFK");
        console.log(notificationnowseen.idguildFK);
        const notificationSeen = "true";
        console.log("notificationSeen");
        console.log(notificationSeen);


        this.http.post<NotificationsReceivers>('http://localhost:8085/notificationreceivers/Update?idNotificationReceiver=' + idNotificationReceiver + '&idPlayerReceiverFK=' + idPlayerReceiverFK + 
        '&ID_Notification_FK=' + ID_Notification_FK + '&ID_Guild_FK=' + ID_Guild_FK + '&notificationSeen=' + notificationSeen, 
        { idNotificationReceiver, idPlayerReceiverFK, ID_Notification_FK, ID_Guild_FK, notificationSeen }).subscribe(resData => {
          console.log(resData);
        });
      });

    }
    this.router.navigate(['../ancient_profile'], { relativeTo: this.route });
  }


  getNotifications() {
    this.notviewed = [];
    this.http.get<NotificationsReceivers[]>('http://localhost:8085/notificationreceivers/Get?idPlayerReceiverFK=' + this.session.playerSession.idplayer).subscribe(data => {
      this.notificationreceiver = data;
      this.notificationids = [];
      for (let noti of this.notificationreceiver) {
        if (noti.notificationSeen == "false") {
          this.notificationids.push(noti.idnotificationFK);
          console.log("IOd da notificação");
          console.log(noti.idnotificationFK);
        }
      }
      console.log("notifications");
      console.log(this.notificationreceiver);
      console.log(this.notificationreceiver[0].idnotificationFK)

      for (let id of this.notificationids) {
        console.log(id);
        this.http.get<Notification[]>('http://localhost:8085/notifications/Get?ID_Notification=' + id).subscribe(data => {

          //falta a filtragem d o not viwed
          this.notviewed.push(data[0]);
          console.log("notifications not viewed");
          console.log(this.notviewed);
        });
      }

    });
  }
}