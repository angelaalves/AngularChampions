import { Component, OnInit } from '@angular/core';
import { SessionService } from './services/session.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from './shared/player.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Project-Champions';

  constructor(private session: SessionService, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    /*
    let email = localStorage.getItem('Email')
    let password = localStorage.getItem('password')
    this.http.post('http://localhost:8085/login', { email, password }).subscribe(
      resData => {
        this.http.post<Player>('http://localhost:8085/players/Get?email=' + email, { email: email }).subscribe(resData => {
          this.http.get<string[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + resData[0].idplayer).subscribe(data => {
            let outfit = data;
            //Create player so we can givew him an imagepath
            let player = new Player(resData[0].idplayer, resData[0].idguildFK, resData[0].userName, resData[0].email, resData[0].password, outfit, resData[0].xp,
              resData[0].champiesToGive, resData[0].myChampies, resData[0].userType, resData[0].gender, resData[0].status);
            //Give a player to the player session so we can use it on other components
            this.session.openSession(player);
            //Select the profile using the usertype
            if (this.session.getPlayerInSession().userType == "Ancient") {
              this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
            }
            if (this.session.getPlayerInSession().userType == "GuildMaster") {
              this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
            }
            if (this.session.getPlayerInSession().userType == "Warrior") {
              this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
            }
          })
        },
          error => {
            console.log("Failed Authentication")
          }
        );
      });
     */
  }


}