import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-events-elem',
  templateUrl: './events-elem.component.html',
  styleUrls: ['./events-elem.component.css']
})
export class EventsElemComponent implements OnInit {
  @Input() event: Event;
  @Input() index: number;

  events: Event[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.post<any[]>('http://localhost:8085/events/getAll', {}).subscribe(eventsData => {
      this.events = eventsData;
    });
  }


}
