import { eventType } from './event-type.enum';

export class Event{
    public evetDate: Date;
    public eventName: string;
    public eventType: eventType;

    constructor(evetDate: Date, eventName: string, eventType: eventType){
        this.evetDate=evetDate;
        this.eventName=eventName;
        this.eventType=eventType;
    }
}