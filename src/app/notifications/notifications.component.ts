import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { HttpClient } from '@angular/common/http';
import { NotificationsReceivers } from '../shared/notificationsReceivers.model';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

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
  public putview: String[];
  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private http: HttpClient, private configuration: AppConfigurationsComponent) {

  }

  ngOnInit() {
    this.getNotifications();
  }

  redirectToProfile() {
    //Fazeraqui
    for (let idsofnoti of this.putview) {
      console.log("idsofnoti ");
      console.log(idsofnoti);
      this.http.get<NotificationsReceivers[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/notificationreceivers/Get?idNotificationReceiver=' + idsofnoti).subscribe(dataaux => {
        const notificationnowseen = dataaux[0];
        const idNotificationReceiver = notificationnowseen.idnotificationReceiver;
        const idPlayerReceiverFK = notificationnowseen.idplayerReceiverFK;
        const ID_Notification_FK = notificationnowseen.idnotificationFK;
        const ID_Guild_FK = notificationnowseen.idguildFK;
        const notificationSeen = "1";
        this.http.post<NotificationsReceivers>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/notificationreceivers/Update?idNotificationReceiver='
          + idNotificationReceiver + '&idPlayerReceiverFK=' + idPlayerReceiverFK +
          '&ID_Notification_FK=' + ID_Notification_FK + '&ID_Guild_FK=' + ID_Guild_FK + '&notificationSeen=' + notificationSeen,
          { idNotificationReceiver, idPlayerReceiverFK, ID_Notification_FK, ID_Guild_FK, notificationSeen }).subscribe(resData => {
          });
      });
    }
    if (this.session.getPlayerInSession().userType == "Ancient") {
      this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "GuildMaster") {
      this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "Warrior") {
      this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
    }
  }


  getNotifications() {
    this.notviewed = [];
    this.putview = [];
    this.http.get<NotificationsReceivers[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/notificationreceivers/Get?idPlayerReceiverFK=' + this.session.getPlayerInSession().idplayer).subscribe(data => {
      this.notificationreceiver = data;
      this.notificationids = [];
      for (let noti of this.notificationreceiver) {
        if (noti.notificationSeen == "false") {
          this.notificationids.push(noti.idnotificationFK);
          this.putview.push(noti.idnotificationReceiver);
        }
      }
      for (let id of this.notificationids) {
        this.http.get<Notification[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/notifications/Get?ID_Notification=' + id).subscribe(data => {
          this.notviewed.push(data[0]);
        });
      }

    });
  }
}