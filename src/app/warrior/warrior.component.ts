import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-warrior',
  templateUrl: './warrior.component.html',
  styleUrls: ['./warrior.component.css']
})

@Injectable({ providedIn: 'root' })
export class WarriorComponent implements OnInit {
  @Input() email: string;
  warrior: Player;
  id: number;
  
  constructor(private session: SessionService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   
 this.warrior= this.session.getPlayerInSession();
  }
}