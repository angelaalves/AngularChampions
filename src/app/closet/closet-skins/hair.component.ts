import { Component, ViewChild, OnInit } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-hair-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <drag-scroll #navegar>
      <img drag-scroll-item src="../../../assets/Hair/HairLongBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairLongBlonde.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairLongBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairLongBrown.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairLongGinger.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairLongGrey.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairLongPink.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairLongWhite.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumBlonde.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumBrown.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumGinger.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumGrey.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumPink.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairMediumWhite.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortBlonde.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortBrown.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortGinger.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortGrey.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortPink.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/Hair/HairShortWhite.png" style="width:15%" (click)="skinSelected()"/>
    </drag-scroll>
    <div>
      <button (click)="moveLeft()">Left</button>
      <button (click)="moveRight()">Right</button>
      <button (click)="moveTo(22)">Last</button>
    </div>
    `,
    styles: [`
      drag-scroll {
        height: 50px
        width: 50px
        background-color: transparent
      }
      `]
  })

export class HairSkins{
    @ViewChild('navegar', {read: DragScrollComponent, static:false}) ds: DragScrollComponent;

    constructor(private router: Router, private route: ActivatedRoute){}

    moveLeft() {
      this.ds.moveLeft();
    }
  
    moveRight() {
      this.ds.moveRight();
    }
  
    moveTo(index) {
      this.ds.moveTo(index);
    }

    skinSelected(){
      this.router.navigate(['/add_skin'], {relativeTo: this.route});
    }
  
    ngAfterViewInit() {
      // Starting ngx-drag-scroll from specified index(0)
      setTimeout(() => {
        this.ds.moveTo(0);
      }, 0);
    }
}