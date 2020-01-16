import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})

@Injectable({ providedIn: 'root' })
export class AddEventsComponent implements OnInit {
  addEventForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute,private http: HttpClient, private configuration: AppConfigurationsComponent) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
        }
      )
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    
    const name = form.value.name;
    const date = form.value.date;
    const eventType = form.value.eventType;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/events/Create?eventName=' + name + '&eventDate=' + date +
      '&eventType=' + eventType , true);
    this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/events/Create?eventName=' + name + '&eventDate=' + date +
    '&eventType=' + eventType,
      {
        name, 
        date,
        eventType
      }
    ).subscribe();


    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }

  private initForm() {
    let date='';
    let isEventRecurrent="";
    let name='';
    let type='';
    let startHour='';
    let finishHour='';

    this.addEventForm = new FormGroup({
      'date': new FormControl(date, Validators.required),
      'isEventRecurrent': new FormControl(isEventRecurrent, Validators.required),
      'name': new FormControl(name, Validators.required),
      'type': new FormControl(type, Validators.required),
      'startHour': new FormControl(startHour, Validators.required),
      'finishHour': new FormControl(finishHour, Validators.required),
    });
  }


  addEvent(addEventForm: FormGroup) {
    (<FormArray>this.addEventForm.get('event')).push(
      new FormGroup({
        'date': new FormControl(null, Validators.required),
        'isEventRecurrent': new FormControl(null, Validators.required),
        'name': new FormControl(null, Validators.required),
        'type': new FormControl(null, Validators.required),
        'startHour': new FormControl(null, Validators.required),
        'finishHour': new FormControl(null, Validators.required)
      })
    );
  } 
}