import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { VirtualTimeScheduler } from 'rxjs';

export class NotificationsReceivers {
  idnotificationReceiver: String;
  idplayerReceiverFK: String;
  idnotificationFK: String;
  idguildFK: String;
  notificationSeen: String;


  constructor(idNotificationReceiver: String, idPlayerReceiverFK: String, ID_Notification_FK: String, ID_Guild_FK: String, notificationSeen: String) {
    this.idnotificationReceiver = idNotificationReceiver;
    this.idplayerReceiverFK = idPlayerReceiverFK;
    this.idnotificationFK = ID_Notification_FK;
    this.idguildFK = ID_Guild_FK;
    this.notificationSeen = notificationSeen;
  }
}