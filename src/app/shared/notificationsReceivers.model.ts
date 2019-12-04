import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { VirtualTimeScheduler } from 'rxjs';

export class NotificationsReceivers{
idnotificationReceiver:String;
   idplayerReceiverFK:String;
     idnotificationFK:String;
    idguildFK:String;
  notificationSeen:String;


    constructor( idnotificationReceiver:String,  idplayerReceiverFK:String,  idnotificationFK:String, idguildFK:String, notificationSeen:String){
        this.idnotificationReceiver=idnotificationReceiver;
       this. idplayerReceiverFK= idplayerReceiverFK;
       this.idnotificationFK=idnotificationFK;
       this.idguildFK=idguildFK;
       this. notificationSeen= notificationSeen;
    }
}