import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService, private http: HttpClient) { }

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
    const player = this.playerService.getPlayer(1);

    const password = form.value.password;
    
    const newPassword=form.value.newPassword;
    console.log(form.value);

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:8085/players/Update?idPlayer=' + player.idplayer + '&userName='  + player.userName + 
    '&email=' + player.email + '&password=' + newPassword + '&gender='  + player.gender + '&userType=' + player.userType + '&xp=' + player.xp + 
    '&champiesToGive='  + player.champiesToGive + '&myChampies=' + player.myChampies + '&=status' + player.status, true);

    this.http.post<any>('http://localhost:8085/players/Update?idPlayer=',
      {
       newPassword
      }
    ).subscribe();
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
   // this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
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