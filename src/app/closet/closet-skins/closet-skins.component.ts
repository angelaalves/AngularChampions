import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-closet-skins',
    template:`
    <ng-image-slider [images]="imageObject" #nav>
    </ng-image-slider>
    <button (click)="prevImageClick()">Prev</button>
    <button (click)="nextImageClick()">Next</button>
    `,
  templateUrl: './closet-skins.component.html',
  styleUrls: ['./closet-skins.component.css']
})
export class ClosetSkinsComponent implements OnInit {
  slideIndex=1; 

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  addSkin(){
    this.router.navigate(['/add_skin'], {relativeTo: this.route});
  }



  /*slide(indexDirection: number): void {
    this.slides[this.slideIndex].selected = false;
    this.slideIndex += indexDirection;
    if(this.slideIndex < 0)
      this.slideIndex = this.slides.length - 1;
    this.slideIndex = this.slideIndex % this.slides.length;
    this.slides[this.slideIndex].selected = true;
  }*/
}