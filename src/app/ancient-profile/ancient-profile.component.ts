import { Component, OnInit, Injectable } from '@angular/core';
import { AncientComponent } from './ancient/ancient.component';
import { AncientImageComponent } from './ancient/ancient-image/ancient-image.component';
import { Player } from '../shared/player.model';
import { LoginComponent } from '../login/login.component';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-ancient-profile',
  templateUrl: './ancient-profile.component.html',
  styleUrls: ['./ancient-profile.component.css']
})

@Injectable({providedIn:"root"})
export class AncientProfileComponent implements OnInit {


public ancient: Player;


  constructor(private session: SessionService , private ancientcom: AncientComponent) { }

  ngOnInit() {
  
    this.ancient=this.session.getPlayerInSession();
  console.log("Ancient profile a atribuir ao ancient o userlogged, ancient="+this.ancient+", userlogged= "+ this.session.getPlayerInSession);
  }

}