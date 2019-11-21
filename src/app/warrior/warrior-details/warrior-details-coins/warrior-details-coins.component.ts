import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { SessionService } from 'src/app/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warrior-details-coins',
  templateUrl: './warrior-details-coins.component.html',
  styleUrls: ['./warrior-details-coins.component.css']
})


@Injectable({ providedIn: 'root' })
export class WarriorDetailsCoinsComponent implements OnInit {
  @Input() coinsGive: number;
  @Input() coinsReceive: number;
 warrior:Player;
    constructor(private router: Router, private route: ActivatedRoute) { 

    }
  
    ngOnInit() {
    }
  
  }

