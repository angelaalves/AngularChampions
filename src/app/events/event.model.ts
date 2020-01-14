import { eventType } from './event-type.enum';

export class Event{
    
    public idevent: string;
    public eventDate: String;
    public eventName: string;
    public eventType: eventType;

    constructor(idevent: string, eventDate: String, eventName: string, eventType: eventType){
        this.idevent=idevent;
        this.eventDate=eventDate;
        this.eventName=eventName;
        this.eventType=eventType;
    }

    
       
    
}