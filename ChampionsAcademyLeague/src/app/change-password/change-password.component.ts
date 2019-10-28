import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

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
    let oldPassword='';
    let newPassword='';
    let confirmPassword='';

    this.changePasswordForm = new FormGroup({
      'oldPassword': new FormControl(oldPassword, Validators.required),
      'newPassword': new FormControl(newPassword, Validators.required),
      'confirmPassword': new FormControl(confirmPassword, Validators.required)
    });
  }

  submit(addUserForm: FormGroup){
    console.log(this.changePasswordForm);
    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }

  changePassword(changePasswordForm: FormGroup) {
    (<FormArray>this.changePasswordForm.get('newPassword')).push(
      new FormGroup({
        'oldPassword': new FormControl(null, Validators.required),
        'newPassword': new FormControl(null, Validators.required),
        'confirmPassword': new FormControl(null, Validators.required)
      })
    );
  }
}