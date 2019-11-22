import { Component, OnInit, ViewChild, ElementRef, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';

@Component({
  selector: 'app-skin-hair',
  templateUrl: './skin-hair.component.html',
  styleUrls: ['./skin-hair.component.css']
})

@Injectable({providedIn: 'root'})
export class SkinHairComponent implements OnInit {
  @Input() hair: Skin[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  skinSelected() {
    this.router.navigate(['../buy_skin'], { relativeTo: this.route });
  }
}