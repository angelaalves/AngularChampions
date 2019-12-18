import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skin-skincolor',
  templateUrl: './skin-skincolor.component.html',
  styleUrls: ['./skin-skincolor.component.css']
})
export class SkinSkincolorComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  skinSelected(){
    this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}
