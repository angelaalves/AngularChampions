import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { eventType } from './event-type.enum';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[]=[
    new Event(new Date(),'Checkpoint',eventType.Checkpoint),
    new Event(new Date(),'Kickoff',eventType.KickOff),
    new Event(new Date(),'jantar de Natal',eventType.ChristmasDinner),
    new Event(new Date(),'jantar de Natal',eventType.ChristmasDinner),
    new Event(new Date(),'jantar de Natal',eventType.ChristmasDinner),
    new Event(new Date(),'jantar de Natal',eventType.ChristmasDinner),
    new Event(new Date(),'jantar de Natal',eventType.ChristmasDinner),
    new Event(new Date(),'jantar de Natal',eventType.ChristmasDinner),
    new Event(new Date(),'jantar de Natal',eventType.ChristmasDinner)
  ];

  constructor() { }

  ngOnInit() {
  }

}