import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';

@Component({
  selector: 'app-skin-shoes',
  templateUrl: './skin-shoes.component.html',
  styleUrls: ['./skin-shoes.component.css']
})
export class SkinShoesComponent implements OnInit {
  @Input() shoes: Skin[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  skinSelected(){
    this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}