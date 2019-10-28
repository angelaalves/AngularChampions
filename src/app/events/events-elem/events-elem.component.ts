import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-events-elem',
  templateUrl: './events-elem.component.html',
  styleUrls: ['./events-elem.component.css']
})
export class EventsElemComponent implements OnInit {
  @Input() event: Event;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}