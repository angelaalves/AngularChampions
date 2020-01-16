import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
      }
    )
  }

  private initForm() {
    let newPassword='';
    let confirmPassword='';

    this.setPasswordForm = new FormGroup({
      'newPassword': new FormControl(newPassword, Validators.required),
      'confirmPassword': new FormControl(confirmPassword, Validators.required)
    });
  }

  onSubmit(addUserForm: FormGroup){
  }


  changePassword(setPasswordForm: FormGroup) {
    (<FormArray>this.setPasswordForm.get('newPassword')).push(
      new FormGroup({
        'newPassword': new FormControl(null, Validators.required),
        'confirmPassword': new FormControl(null, Validators.required)
      })
    );
  }
}