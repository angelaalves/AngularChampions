import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})

export class AddEventsComponent implements OnInit {
  addEventForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
        }
      )
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

  submit(){
    console.log(this.addEventForm);
    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }
}