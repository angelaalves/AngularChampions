import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { gender } from 'src/app/shared/playerGender.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { status } from 'src/app/shared/status.enum';

@Component({
  selector: 'app-ancient-image',
  templateUrl: './ancient-image.component.html',
  styleUrls: ['./ancient-image.component.css']
})
export class AncientImageComponent implements OnInit {
  @Input() name: string
  @Input() hairImagePath: string
  @Input() skinImagePath: string
  @Input() shirtImagePath: string
  @Input() pantsImagePath: string
  @Input() shoesImagePath: string
  @Input() othersImagePath: string
  @Input() size: number
  @Input() status: status

  ancient: Player;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
  }

 
}