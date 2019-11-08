import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../shared/player.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @Input() player: Player;
  
  constructor() { }

  ngOnInit() {
  }

}
