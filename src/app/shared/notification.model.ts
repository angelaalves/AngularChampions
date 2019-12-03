import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { VirtualTimeScheduler } from 'rxjs';

export class Notification{
   ID_Notification:String;
    ID_PlayerSender_FK:String;
    idGuildFK:String;
   idRewardFK:String;
     idEventFK:String;
    description:String;

    constructor( idEventFK:String , idGuildFK:String , ID_Notification:String , ID_PlayerSender_FK:String , idRewardFK:String , description:String ){
        this.idEventFK=idEventFK;
       this.idGuildFK= idGuildFK;
       this.ID_Notification= ID_Notification;
       this.ID_PlayerSender_FK=ID_PlayerSender_FK;
       this.idRewardFK=idRewardFK;
       this.description=description;
    }
}