import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { VirtualTimeScheduler } from 'rxjs';

export class NotificationsReceivers{
idNotificationReceiver:String;
   idPlayerReceiverFK:String;
     ID_Notification_FK:String;
    ID_Guild_FK:String;
  notificationSeen:String;


    constructor( idNotificationReceiver:String, idPlayerReceiverFK:String,  ID_Notification_FK:String, ID_Guild_FK:String, notificationSeen:String){
        this.idNotificationReceiver=idNotificationReceiver;
       this.idPlayerReceiverFK=idPlayerReceiverFK;
       this.ID_Notification_FK=ID_Notification_FK;
       this.ID_Guild_FK=ID_Guild_FK;
       this. notificationSeen= notificationSeen;
    }
}