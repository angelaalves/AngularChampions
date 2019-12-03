import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { eventType } from './event-type.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post<any[]>('http://localhost:8085/events/getAll', {}).subscribe(eventsData => {
      console.log(eventsData)
      this.events = eventsData
      console.log(this.events)
    }
    )
  }

}