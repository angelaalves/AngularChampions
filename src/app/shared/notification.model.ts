import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { VirtualTimeScheduler } from 'rxjs';

export class Notification{
    private idNotification:string;
    private idPlayerSenderFK:string;
    private idGuildFK:string;
    private idRewardFK:string;
    private idEventFK:string;
    private description:string;


    constructor(idNotification:string,idPlayerSenderFK:string,idGuildFK:string,idRewardFK:string,idEventFK:string,description:string){
        this.idNotification=idNotification;
       this.idPlayerSenderFK=idPlayerSenderFK;
       this.idGuildFK=idGuildFK;
       this.idRewardFK=idRewardFK;
       this.idEventFK=idEventFK;
       this.description=description;
    }
}