import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { Player } from '../shared/player.model';
import { VirtualTimeScheduler } from 'rxjs';

 
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent implements OnInit {
  
  wrongPassword = false;

  oldPassword: string;
  newPassword: string;
  confirmPassword :String;
  isSubmitted = false;
  player: Player; 
 
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService, private formBuilder: FormBuilder) {}
 
    changePasswordForm = this.formBuilder.group({
    oldPassword: new FormControl('', [
      Validators.required
    ]),
    newPassword: new FormControl('', [
      Validators.minLength(10)
      
    ])
  })


  ngOnInit() {
    this.player = this.session.playerSession;
  }

  verifyOldPassword(form: NgForm){
    const oldPassword = form.value.oldPassword;

    console.log("email: " + this.player.email + " password: " + this.player.password);
    this.http.get<boolean>('http://localhost:8085/players/verifyPassword?email=' + this.player.email + '&password=' + oldPassword)
      .subscribe(data => {
      this.wrongPassword = data;
      if(this.wrongPassword===false){
        console.log(this.wrongPassword);
        this.player.password=oldPassword;
        console.log("same passwords");
      }
      else {
        console.log("different password")
      }
    });
    
  }

  changePassword(form: NgForm) {
    const confirmPassword = form.value.confirmPassword;
    const newPassword = form.value.newPassword;

    this.http.post<Player>('http://localhost:8085/players/Update?idPlayer=' + this.player.idplayer + '&userName=' + this.player.userName +
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
        return
      console.log("Wrong password")
    }
  });

  }

 
 onSubmit(form: NgForm) {


  if(!form.valid) {
    return
   /* this.http.post<Player>('http://localhost:8085/players/UpdatePassword?idPlayer=' + this.player.idplayer + '&oldPassword=' + oldPassword + '&newPassword=' + newPassword,
      {
        newPassword,
        oldPassword
      }
    ).subscribe(success=>{
      
    });*/
    

    
  }
  



 /* */

  /*
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
}