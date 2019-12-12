import { eventType } from './event-type.enum';

export class Event{
    public date: Date;
    public name: string;
    public type: eventType;

    constructor(date: Date, name: string, type: eventType){
        this.date=date;
        this.name=name;
        this.type=type;
    }
}