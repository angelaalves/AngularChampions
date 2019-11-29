import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})



@Injectable({ providedIn: 'root' })
export class NotificationsComponent implements OnInit {
public notifications: Notification[];
public notviewed:Notification[];
public viewed:Notification[];
  constructor(private router: Router, private route: ActivatedRoute,private session: SessionService, private http: HttpClient, private authService: AuthenticationService) { 
    
  }

  ngOnInit() {
  }

  redirectToProfile(){
    this.router.navigate(['../ancient_profile'], {relativeTo: this.route});
  }


  getNotifications(){
    this.http.get<Notification[]>('http://localhost:8085/watchedVideos/Get?idPlayerFK=' + this.session.playerSession.idplayer).subscribe(data => {
      this.notifications = data;
      
      console.log("notifications");
      console.log(this.notifications);

      for (let notification of this.notifications) {

        //alterar o viwed
        this.http.get<Notification[]>('http://localhost:8085/videos/Get?viewed=' + "true").subscribe(data => {
          this.viewed.push(data[0]);
          console.log("notifications");
          console.log(this.notifications);
        });
      }

    });
  }
}