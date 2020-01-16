import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, NgForm, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../services/session.service';
import { Player } from '../shared/player.model';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})


export class ChangePasswordComponent implements OnInit {

  correctPassword = false;

  oldPassword: string;
  newPassword: string;
  confirmPassword: String;
  isSubmitted = false;
  player: Player;
  public changePasswordFailed: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private session: SessionService, private formBuilder: FormBuilder, private configuration: AppConfigurationsComponent) { }

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

    this.http.get<boolean>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/verifyPassword?email=' + this.player.email + '&password=' + oldPassword)
      .subscribe(data => {
        this.correctPassword = data;
        if (this.correctPassword == true) {
          this.changePasswordFailed = false;
          this.player.password = oldPassword;
          console.log("same passwords");
          this.http.post<Player>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/Update?idPlayer=' + this.player.idplayer + '&userName=' + this.player.userName +
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
