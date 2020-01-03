import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormArray } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { status } from 'src/app/shared/status.enum';
import { HttpClient } from '@angular/common/http';
import { userType } from 'src/app/shared/userType.enum';
import { Skin } from 'src/app/shared/skin.model';
import { Closet } from 'src/app/shared/closet.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

@Injectable({ providedIn: 'root' })
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService, private http: HttpClient) {
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
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const skins = [];
    const xp = "0";
    const champiesToGive = "20";
    const myChampies = "0";
    const gender = form.value.gender;
    const playerType = form.value.playertype;
    const statusPlayer = status.Active;
    console.log(form.value.name)
    this.playerService.addPlayer(new Player(id, name, email, password, skins, xp, champiesToGive, myChampies, playerType, gender, statusPlayer));
    console.log('addUserForm', form.value);

    this.http.post<Player>('http://localhost:8188/players/Create?idPlayer=' + id + '&userName=' + name +
      '&email=' + email + '&password=' + password + "&gender=" + gender + "&userType=" + playerType + '&xp=' + xp + '&champiesToGive=' + champiesToGive
      + '&myChampies=' + myChampies + '&status=' + statusPlayer,
      {
        id,
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
    ).subscribe(success => {
      this.http.post('http://localhost:8188/players/SendEmail?playerEmail=' + email, {}).subscribe(resData => {
        console.log(resData);
      })
    }, error => {
      console.log("error creating player")
    });
    var idplayer: String;
    this.http.get<Player>('http://localhost:8085/players/Get?userName=' + name).subscribe(res => {
      idplayer = res.idplayer;
      console.log(idplayer);

    });

    if (playerType == userType.Warrior) {
      this.addActiveSkins(idplayer, gender);
    } else {
      this.addAllSkins(idplayer, gender);
    }
    this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
  }

  addAllSkins(idplayer: String, gender: String) {

    var allskins: Skin[];
    this.http.get<Skin[]>('http://localhost:8085/skins/getAll').subscribe(res => {
      allskins = res;
      console.log(allskins);
    });
    for (let skin of allskins) {
      const idskin = skin.idskin;
      const status = 'Inactive';
      this.http.post<Closet>('http://localhost:8085/closet/Create?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
        '&status=' + status,
        {
          idskin,
          idplayer,
          status
        }
      ).subscribe(success => {

        console.log(success);

      }, error => {
        console.log("error creating closet")
      });
    }
    if (gender == 'F') {
      
      const skinsToActive = ["7", "9", "43", "57", "69", "78"];
      for (let skin of skinsToActive) {
        const idskin = skin;
        const status = 'Active';
        this.http.post<Closet>('http://localhost:8085/closet/Update?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
          '&status=' + status,
          {
            idskin,
            idplayer,
            status
          }
        ).subscribe(success => {

          console.log(success);

        }, error => {
          console.log("error creating closet")
        });
      }
    } else {
     
      const skinsToActive = ["7", "25", "43", "65", "68", "78"];
      for (let skin of skinsToActive) {
        const idskin = skin;
        const status = 'Active';
        this.http.post<Closet>('http://localhost:8085/closet/Update?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
          '&status=' + status,
          {
            idskin,
            idplayer,
            status
          }
        ).subscribe(success => {

          console.log(success);

        }, error => {
          console.log("error updating closet")
        });
      }
    }
  }

  addActiveSkins(idplayer: String, gender: String) {

    if (gender == 'F') {
      const skinsToAdd = ["7", "9", "43", "50", "55", "57", "68", "69", "74", "75", "76", "77", "78"];
      for (let skin of skinsToAdd) {
        const idskin = skin;
        const status = 'Inactive';
        this.http.post<Closet>('http://localhost:8085/closet/Create?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
          '&status=' + status,
          {
            idskin,
            idplayer,
            status
          }
        ).subscribe(success => {

          console.log(success);

        }, error => {
          console.log("error creating closet")
        });
      }

      const skinsToActive = ["7", "9", "43", "57", "69", "78"];
      for (let skin of skinsToActive) {
        const idskin = skin;
        const status = 'Active';
        this.http.post<Closet>('http://localhost:8085/closet/Update?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
          '&status=' + status,
          {
            idskin,
            idplayer,
            status
          }
        ).subscribe(success => {

          console.log(success);

        }, error => {
          console.log("error creating closet")
        });
      }
    } else {
      const skinsToAdd = ["7", "25", "43", "58", "62", "65", "68", "69", "74", "75", "76", "77", "78"];
      for (let skin of skinsToAdd) {
        const idskin = skin;
        const status = 'Inactive';
        this.http.post<Closet>('http://localhost:8085/closet/Create?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
          '&status=' + status,
          {
            idskin,
            idplayer,
            status
          }
        ).subscribe(success => {

          console.log(success);

        }, error => {
          console.log("error updating closet")
        });
      }
      const skinsToActive = ["7", "25", "43", "65", "68", "78"];
      for (let skin of skinsToActive) {
        const idskin = skin;
        const status = 'Active';
        this.http.post<Closet>('http://localhost:8085/closet/Update?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
          '&status=' + status,
          {
            idskin,
            idplayer,
            status
          }
        ).subscribe(success => {

          console.log(success);

        }, error => {
          console.log("error updating closet")
        });
      }
    }
  }

  private initForm() {
    let name = '';
    let userType = '';
    let gender = '';
    let email = '';
    let password = '';

    this.addUserForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'gender': new FormControl(gender, Validators.required),
      'playertype': new FormControl(userType, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.minLength(10)]),
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