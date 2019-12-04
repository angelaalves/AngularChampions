import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { VirtualTimeScheduler } from 'rxjs';

export class Notification{
  idnotification:String;
    idplayerSenderFK:String;
    idguildFK:String;
   idrewardFK:String;
     ideventFK:String;
    description:String;

    constructor( ideventFK:String , idguildFK:String ,  idnotification:String , idplayerSenderFK:String , idrewardFK:String , description:String ){
        this.ideventFK=ideventFK;
       this.idguildFK= idguildFK;
       this.idnotification= idnotification;
       this.idplayerSenderFK=idplayerSenderFK;
       this.idrewardFK=idrewardFK;
       this.description=description;
    }
}