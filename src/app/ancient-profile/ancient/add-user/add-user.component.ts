import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormArray } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { status } from 'src/app/shared/status.enum';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

@Injectable({ providedIn: 'root' })
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService,private http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.initForm();
      }
    )
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const id = "1";
    const idGuild = "1";
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const skins = [];
    const xp = "100";
    const champiesToGive = "100";
    const myChampies = "100";
    const gender = form.value.gender;
    const playerType = form.value.playertype;
    const statusPlayer = status.Active;
    console.log(form.value.name)
    this.playerService.addPlayer(new Player(id, idGuild, name, email, password, skins, xp, champiesToGive, myChampies, playerType, gender, statusPlayer));
    console.log('addUserForm', form.value);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8085/players/Create?idPlayer=' + id + '&idGuildFK=' + idGuild + '&userName=' + name +
      '&email=' + email + '&password=' + password + "&gender=" + gender + "&userType=" + playerType + '&xp=' + xp + '&champiesToGive=' + champiesToGive
      + '&myChampies=' + myChampies + '&status=' + statusPlayer, true);
    this.http.post<Player>('http://localhost:8085/players/Create?idPlayer=' + id + '&idGuildFK=' + idGuild + '&userName=' + name +
      '&email=' + email + '&password=' + password + "&gender=" + gender + "&userType=" + playerType + '&xp=' + xp + '&champiesToGive=' + champiesToGive
      + '&myChampies=' + myChampies + '&status=' + statusPlayer,
      {
        id,
        idGuild,
        name,
        email,
        password,
        skins,
        xp,
        champiesToGive,
        myChampies,
        gender,
        playerType,
        statusPlayer
      }
    ).subscribe();

    this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
  }

  private initForm() {
    let name = '';
    let playertype = '';
    let gender = '';
    let email = '';
    let password = '';

    this.addUserForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'gender': new FormControl(gender, Validators.required),
      'playertype': new FormControl(playertype, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.minLength(10)]),
      'playerType': new FormControl(playerType),
      'gender': new FormControl(gender, [Validators.required, Validators.minLength(10)]),
      'password': new FormControl(password, [Validators.required, Validators.minLength(6)])
    });
  }

  addUser(addUserForm: FormGroup) {
    (<FormArray>this.addUserForm.get('event')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'gender': new FormControl(null, [Validators.required]),
        'playertype': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.minLength(10)]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    );
  }
}