import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { Player } from '../shared/player.model';

 
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  passwordCorrect = false;
  oldPassword: string;
  newPassword: string;
  confirmPassword :String;
  player: Player; 
 
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService) { }
 
  ngOnInit() {
    this.player = this.session.playerSession;
   
  }
 
  verifyOldPassword(form: NgForm){
    let oldPassword = form.value.oldPassword;
    console.log("email: " + this.player.email + " password: " + this.player.password);
    this.http.get<boolean>('http://localhost:8189/players/verifyPassword?email=' + this.player.email + '&password=' + oldPassword).subscribe(data => {
      this.passwordCorrect = data;
      if(this.passwordCorrect===false){
        console.log(this.passwordCorrect);
        this.player.password=oldPassword;
        console.log("same passwords");
      }
      else {
        console.log("different password")
      }
    });
    
  }
 
  updatePassword(form: NgForm){

    let confirmPassword = form.value.confirmPassword;

    this.http.post<Player>('http://localhost:8189/players/Update?idPlayer=' + this.player.idplayer + '&userName=' + this.player.userName +
      '&email=' + this.player.email + '&password=' + confirmPassword + "&gender=" + this.player.gender + "&userType=" + this.player.userType + '&xp=' + this.player.xp + '&champiesToGive=' + this.player.champiesToGive
      + '&myChampies=' +this.player.myChampies + '&status=' + this.player.status,
      {
        confirmPassword
      }
    ).subscribe(success=>{
      if(this.oldPassword != confirmPassword) {
        this.player.password = confirmPassword;
      }
    else {
      console.log("Unable to change password")
    }
    });


  }
 /* onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
   
 
   const oldPassword = form.value.oldPassword;
 
    const newPassword = form.value.newPassword;
    console.log(form.value);
 
  }
 
  private initForm() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
 
    this.changePasswordForm = new FormGroup({
      'oldPassword': new FormControl(this.oldPassword, Validators.required),
      'newPassword': new FormControl(this.newPassword, Validators.required),
      'confirmPassword': new FormControl(this.confirmPassword, Validators.required)
    });
  }
 
  submit(addUserForm: FormGroup) {
    console.log(this.changePasswordForm);
    // this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }
 
  changePassword(changePasswordForm: FormGroup) {
    (<FormArray>this.changePasswordForm.get('newPassword')).push(
      new FormGroup({
        'oldPassword': new FormControl(this.verifyOldPassword, Validators.required),
        'newPassword': new FormControl(null, Validators.required),
        'confirmPassword': new FormControl(null, Validators.required)
      })
    );
  }*/
}