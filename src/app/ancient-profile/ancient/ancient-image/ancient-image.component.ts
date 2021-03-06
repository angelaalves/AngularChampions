import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { gender } from 'src/app/shared/playerGender.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { status } from 'src/app/shared/status.enum';
import { userType } from 'src/app/shared/userType.enum';

@Component({
  selector: 'app-ancient-image',
  templateUrl: './ancient-image.component.html',
  styleUrls: ['./ancient-image.component.css']
})
@Injectable({providedIn:"root"})
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

  constructor() { }

  ngOnInit() {
  }
}