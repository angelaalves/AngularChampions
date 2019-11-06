import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skin-top',
  templateUrl: './skin-top.component.html',
  styleUrls: ['./skin-top.component.css']
})
export class SkinTopComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  skinSelected(){
    this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}