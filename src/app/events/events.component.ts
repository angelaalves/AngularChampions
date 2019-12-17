import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { AttendedEvents } from './attendedevents.model';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../login/authentication/authentication.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventForm: FormGroup;
  public attendedEventsByPlayer: AttendedEvents[] = [];
  public idOfattendedEventsByPlayer: String[] = [];
  public eventsAttendedByPlayer: Event[] = [];
  public idOfEventsChecked: String[] = [];
  public idOfEventsUnchecked: String[] = [];
  public events: Event[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private http: HttpClient, private authService: AuthenticationService) {
    console.log(session.playerSession.idplayer);
  }

  ngOnInit() {
    this.allEvents();
    this.getAttendedEvents()

  }


  hasEvent(event: Event) {
    const obj = JSON.stringify(event);

    for (let v of this.eventsAttendedByPlayer) {
      console.log("V of eventsattendedbyplayer no hasEvent" + v);
      if (v.idevent == event.idevent) {

        return true;
      }
    } return false;
  }
  allEvents() {

    this.http.get<Event[]>('http://localhost:8085/events/getAll').subscribe(data => {
      this.events = data;
    });
  }

  getAttendedEvents() {

    this.http.get<AttendedEvents[]>('http://localhost:8085/attendedEvents/Get?idPlayerFK=' + this.session.playerSession.idplayer).subscribe(data => {
      const obj = JSON.stringify(data);
      this.attendedEventsByPlayer = data;
      for (let aux of this.attendedEventsByPlayer) {
        this.http.get<Event[]>('http://localhost:8085/events/get?idEvent=' + aux.ideventFK).subscribe(res => {
          const obj2 = JSON.stringify(res);
          this.eventsAttendedByPlayer.push(res[0]);
        });
      }

    });

  }

  Save() {
    if (this.idOfEventsChecked != undefined) {
      for (let idEvent of this.idOfEventsChecked) {

        const id = idEvent;
        const idplayer = this.session.playerSession.idplayer;

        this.http.post<any>('http://localhost:8085/attendedEvents/Create?idEventsFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => {
          });
      }
    }
    if (this.idOfEventsUnchecked != undefined) {
      for (let idEvent of this.idOfEventsUnchecked) {
        const id = idEvent;
        const idplayer = this.session.playerSession.idplayer;

        this.http.post<any>('http://localhost:8085/attendedEvents/Delete?idEventsFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => {
          });
      }
    }

    if (this.session.getPlayerInSession().userType == "Ancient") {
      this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "GuildMaster") {
      this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "Warrior") {
      this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
    }
  }



  checked(event: String) {
    var exists: boolean;
    exists = false;
    const obj = JSON.stringify(event);
    for (let x of this.idOfEventsChecked) {
      if (x == event) {
        exists = true;
      }
    }

    if (exists == false) {
      this.idOfEventsChecked.push(event);
    } else {
      this.idOfEventsChecked.splice(this.idOfEventsChecked.indexOf(event), 1);

    }
  }



  unchecked(event: String) {
    var exists: boolean;
    exists = false;
    const obj = JSON.stringify(event);
    for (let x of this.idOfEventsUnchecked) {
      if (x == event) {
        exists = true;

      }
    }
    if (exists == false) {
      this.idOfEventsUnchecked.push(event);
    } else {

      this.idOfEventsUnchecked.splice(this.idOfEventsUnchecked.indexOf(event), 1);

    }

  }






}

