import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm, FormBuilder, AbstractControl } from '@angular/forms';
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

  wrongPassword = false;

  oldPassword: string;
  newPassword: string;
  confirmPassword: String;
  isSubmitted = false;
  player: Player;
  public changePasswordFailed: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService, private formBuilder: FormBuilder) { }

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


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const oldPassword = form.value.oldPassword;
    const confirmPassword = form.value.confirmPassword;

    console.log("email: " + this.player.email + " password: " + this.player.password);
    this.http.get<boolean>('http://localhost:8085/players/verifyPassword?email=' + this.player.email + '&password=' + oldPassword)
      .subscribe(data => {
        this.wrongPassword = data;
        if (this.wrongPassword === false) {
          this.changePasswordFailed = false;
          console.log(this.wrongPassword);
          this.player.password = oldPassword;
          console.log("same passwords");
          this.http.post<Player>('http://localhost:8085/players/Update?idPlayer=' + this.player.idplayer + '&userName=' + this.player.userName +
            '&email=' + this.player.email + '&password=' + confirmPassword + "&gender=" + this.player.gender + "&userType=" + this.player.userType + '&xp=' + this.player.xp + '&champiesToGive=' + this.player.champiesToGive
            + '&myChampies=' + this.player.myChampies + '&status=' + this.player.status,
            {
              confirmPassword
            }
          ).subscribe(success => {
            console.log("Changed password successfully")
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
          );
        }
        else {
          this.changePasswordWarning();
          console.log("different password")
        }
      }
      );

      



  }

  changePasswordWarning() {
    if (this.changePasswordFailed === true) {
      this.router.navigate(['../change_password_warning'], { relativeTo: this.route });
    }
  }
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

