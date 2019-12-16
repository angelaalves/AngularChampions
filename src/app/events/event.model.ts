import { eventType } from './event-type.enum';

export class Event{
    public idevent: string;
    public evetDate: Date;
    public eventName: string;
    public eventType: eventType;

    constructor(idevent: string,evetDate: Date, eventName: string, eventType: eventType){
        this.idevent=idevent;
        this.evetDate=evetDate;
        this.eventName=eventName;
        this.eventType=eventType;
    }
}