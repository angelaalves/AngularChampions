import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-closet-skins',
  templateUrl: './closet-skins.component.html',
  styleUrls: ['./closet-skins.component.css']
})

export class ClosetSkinsComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  addSkin(){
    this.router.navigate(['/add_skin'], {relativeTo: this.route});
  }
}