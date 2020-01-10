import { eventType } from './event-type.enum';

export class Event{
    public idevent: string;
    public evetDate: String;
    public eventName: string;
    public eventType: eventType;

    constructor(idevent: string,evetDate: String, eventName: string, eventType: eventType){
        this.idevent=idevent;
        this.evetDate=evetDate;
        this.eventName=eventName;
        this.eventType=eventType;
    }
}