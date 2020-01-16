import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { AttendedEvents } from '../shared/attendedevents.model';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { eventType } from '../shared/event-type.enum';
import { Player } from '../shared/player.model';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

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
  public KickOffXP = 15;
  public CheckPointXP = 15;
  public ChristmasXP = 10;
  public FamilyXP = 10;
  public HappyHourXP = 3;
  public BoardGamesXP = 4;
  public TripXP = 5;
  public TalkingSessionsXP = 2;
  public OthersXP = 1;

  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private http: HttpClient, private configuration: AppConfigurationsComponent) {}

  ngOnInit() {
    this.allEvents();
    this.getAttendedEvents();
  }

  hasEvent(event: Event) {
    const obj = JSON.stringify(event);
    for (let v of this.eventsAttendedByPlayer) {
      if (v.idevent == event.idevent) {
        return true;
      }
    } return false;
  }

  allEvents() {
    this.http.get<Event[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/events/getAll').subscribe(data => {
      this.events = data;
    });
  }

  getAttendedEvents() {
    this.http.get<AttendedEvents[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/attendedEvents/Get?idPlayerFK=' + this.session.playerSession.idplayer).subscribe(data => {
      this.attendedEventsByPlayer = data;
      for (let aux of this.attendedEventsByPlayer) {
        this.http.get<Event[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/events/get?idEvent=' + aux.ideventFK).subscribe(res => {
          console.log(res);
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
        this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/attendedEvents/Create?idEventsFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => {
          });
        var eventaux: Event;
        this.http.get<Event[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/events/get?idEvent=' + idEvent).subscribe(res => {
          const obj2 = JSON.stringify(res);
          eventaux = res[0];
          const idPlayer = this.session.playerSession.idplayer;
          const userName = this.session.playerSession.userName;
          const email = this.session.playerSession.email;
          console.log                                                                                                                                                                                                                                                      
          const password = this.session.playerSession.password;
          const gender = this.session.playerSession.gender;
          const userType = this.session.playerSession.userType;
          var xp = this.session.playerSession.xp;
          if (eventaux.eventType === eventType.KickOff) {
            xp = (Number(xp) + this.KickOffXP).toString();
          }
          if (eventaux.eventType === eventType.Checkpoint) {
            xp = (Number(xp) + this.CheckPointXP).toString();
          }
          if (eventaux.eventType === eventType.ChristmasDinner) {
            xp = (Number(xp) + this.ChristmasXP).toString();
          }
          if (eventaux.eventType === eventType.FamilyDay) {
            xp = (Number(xp) + this.FamilyXP).toString();
          }
          if (eventaux.eventType === eventType.HappyHour) {
            xp = (Number(xp) + this.HappyHourXP).toString();
          }
          if (eventaux.eventType === eventType.BoardingGames) {
            xp = (Number(xp) + this.BoardGamesXP).toString();
          }
          if (eventaux.eventType === eventType.AnnualTrip) {
            xp = (Number(xp) + this.TripXP).toString();
          }
          if (eventaux.eventType === eventType.TalkingSession) {
            xp = (Number(xp) + this.TalkingSessionsXP).toString();
          }
          if (eventaux.eventType === eventType.Other) {
            xp = (Number(xp) + this.OthersXP).toString();
          }
          this.session.getPlayerInSession().xp = xp;
          this.XP();
          const champiesToGive = this.session.playerSession.champiesToGive;
          const myChampies = this.session.playerSession.myChampies;
          const status = this.session.playerSession.status;
          this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/Update?idPlayer=' + idPlayer + '&userName=' + userName + '&email=' + email + '&password=' + password + '&gender=' + gender + '&userType=' + userType + '&xp=' + xp + '&champiesToGive=' + champiesToGive + '&myChampies=' + myChampies + '&status=' + status,
            {
              idPlayer,
              userName,
              email,
              password,
              gender,
              userType,
              xp,
              champiesToGive,
              myChampies,
              status
            }).subscribe(data => {
            });
        });
      }
    }
    if (this.idOfEventsUnchecked != undefined) {
      for (let idEvent of this.idOfEventsUnchecked) {
        const id = idEvent;
        const idplayer = this.session.playerSession.idplayer;
        this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/attendedEvents/Delete?idEventsFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => { });
        this.http.get<Event[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/events/get?idEvent=' + idEvent).subscribe(res => {
          const obj2 = JSON.stringify(res);
          eventaux = res[0];
          const idPlayer = this.session.playerSession.idplayer;
          const userName = this.session.playerSession.userName;
          const email = this.session.playerSession.email;
          const password = this.session.playerSession.password;
          const gender = this.session.playerSession.gender;
          const userType = this.session.playerSession.userType;
          var xp = this.session.playerSession.xp;
          if (eventaux.eventType == eventType.KickOff) {
            xp = (Number(xp) - this.KickOffXP).toString();
          }
          if (eventaux.eventType == eventType.Checkpoint) {

            xp = (Number(xp) - this.CheckPointXP).toString();
          }
          if (eventaux.eventType == eventType.ChristmasDinner) {
            xp = (Number(xp) - this.ChristmasXP).toString();
          }
          if (eventaux.eventType == eventType.FamilyDay) {
            xp = (Number(xp) - this.FamilyXP).toString();
          }
          if (eventaux.eventType == eventType.HappyHour) {
            xp = (Number(xp) - this.HappyHourXP).toString();
          }
          if (eventaux.eventType == eventType.BoardingGames) {
            xp = (Number(xp) - this.BoardGamesXP).toString();
          }
          if (eventaux.eventType == eventType.AnnualTrip) {
            xp = (Number(xp) - this.TripXP).toString();
          }
          if (eventaux.eventType == eventType.TalkingSession) {
            xp = (Number(xp) - this.TalkingSessionsXP).toString();
          }
          if (eventaux.eventType == eventType.Other) {
            xp = (Number(xp) - this.OthersXP).toString();
          }
          this.session.getPlayerInSession().xp = xp;
          this.XP();
          const champiesToGive = this.session.playerSession.champiesToGive;
          const myChampies = this.session.playerSession.myChampies;
          const status = this.session.playerSession.status;
          this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/Update?idPlayer=' + idPlayer + '&userName=' + userName + '&email=' + email + '&password=' + password + '&gender=' + gender + '&userType=' + userType + '&xp=' + xp + '&champiesToGive=' + champiesToGive + '&myChampies=' + myChampies + '&status=' + status,
            {
              idPlayer,
              userName,
              email,
              password,
              gender,
              userType,
              xp,
              champiesToGive,
              myChampies,
              status
            }).subscribe(data => {
            });
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

  XP() {
    var playerData: Player = JSON.parse(localStorage.getItem('playerlogged'));

    if (!playerData) {
      return;
    } else {
      localStorage.setItem("playerlogged", JSON.stringify(this.session.playerSession));
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