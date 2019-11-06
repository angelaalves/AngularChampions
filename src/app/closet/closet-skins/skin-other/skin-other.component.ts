import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skin-other',
  templateUrl: './skin-other.component.html',
  styleUrls: ['./skin-other.component.css']
})
export class SkinOtherComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  skinSelected(){
    this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}
