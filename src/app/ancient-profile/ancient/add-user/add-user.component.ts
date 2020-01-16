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
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

@Injectable({ providedIn: 'root' })
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  allskins: Skin[];

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService, private http: HttpClient, private configurations: AppConfigurationsComponent) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.initForm();
      }
    )
    this.http.get<Skin[]>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/skins/getAll').subscribe(res => {
      this.allskins = res;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const skins = [];
    const gender = form.value.gender;
    const playerType = form.value.playertype;

    this.http.post<Player>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/players/CreateNewPlayer?userName=' + name +
      '&email=' + email + "&gender=" + gender + "&userType=" + playerType,
      {
        name,
        email,
        gender,
        playerType
      }
    ).subscribe(success => {
      this.http.get<Player[]>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/players/Get?idPlayer= &userName=' + name + '&email= &password= &gender= &userType= &xp= &champiesToGive= &myChampies= &status= ').subscribe(res => {
        var idplayer: string;
        idplayer = res[0].idplayer;
        this.playerService.addPlayer(new Player(idplayer, name, res[0].email, res[0].password, skins, res[0].xp, res[0].champiesToGive, res[0].myChampies, res[0].userType, res[0].gender, res[0].status));
        if (res[0].userType == userType.Warrior) {
          this.addActiveSkins(idplayer, gender);
        } else {
          this.addAllSkins(idplayer, gender);
        }
      });
    }, error => {
      console.log("error creating player")
    });
    this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
  }

  giveDefaultSkins(idplayer: String, gender: String) {
    if (gender == 'F') {
      const skinsToActive = ["7", "9", "43", "57", "69", "76"];
      for (let skin of skinsToActive) {
        const idskin = skin;
        const status = 'Active';
        console.log("allskin")
        console.log(skin);
        console.log("allskin")
        console.log(skin);
        this.http.post<Closet>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/closet/Update?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
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
      const skinsToActive = ["7", "25", "43", "65", "68", "76"];
      for (let skin of skinsToActive) {
        const idskin = skin;
        const status = 'Active';
        this.http.post<Closet>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/closet/Update?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
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

  addAllSkins(idplayer: String, gender: String) {
    for (let skin of this.allskins) {
      const idskin = skin.idskin;
      const status = 'Inactive';
      this.http.post<Closet>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/closet/Create?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
        '&status=' + status,
        {
          idskin,
          idplayer,
          status
        }
      ).subscribe(success => {
        console.log(success);
      }, error => {
        console.log("error creating closet");
      });
    }
    this.giveDefaultSkins(idplayer, gender);
  }

  addActiveSkins(idplayer: String, gender: String) {
    if (gender == 'F') {
      const skinsToAdd = ["4", "7", "9", "10", "12", "13", "43", "50", "55", "57", "68", "69", "74", "75", "76", "77", "78"];
      for (let skin of skinsToAdd) {
        const idskin = skin;
        const status = 'Inactive';
        this.http.post<Closet>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/closet/Create?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
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
      this.giveDefaultSkins(idplayer, gender);
    } else {
      const skinsToAdd = ["7", "25", "26", "28", "29", "43", "58", "62", "65", "68", "69", "74", "75", "76", "77", "78"];
      for (let skin of skinsToAdd) {
        const idskin = skin;
        const status = 'Inactive';
        this.http.post<Closet>('http://'+this.configurations.getBackEndIP()+':'+this.configurations.getBackEndPort()+'/closet/Create?idSkinFK=' + idskin + '&idPlayerFk=' + idplayer +
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
      this.giveDefaultSkins(idplayer, gender);
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