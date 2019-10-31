import { Component, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-skinColor-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <drag-scroll #nav style="margin-top: 8%; text-align: center">
      <img drag-scroll-item src="../../../assets/SkinColor/AngLastairbender.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemaleBlack.png" style="width:15%"(click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemaleBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemaleChinese.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemaleGreen.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemaleMorena.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemaleMulata.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemaleRed.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/FemalWhie.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleChinese.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleGreen.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleMolato.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleMoreno.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleRed.png" style="width:15%" (click)="skinSelected()"/>
      <img drag-scroll-item src="../../../assets/SkinColor/MaleWhite.png" style="width:15%" (click)="skinSelected()"/>
      </drag-scroll>
      <div>
        <button (click)="moveLeft()">Left</button>
        <button (click)="moveRight()">Right</button>
        <button (click)="moveTo(15)">Last</button>
      </div>
      `,
      styles: [`
        drag-scroll {
          height: 50px
          width: 50px
        }
        `]
    })
  
export class SkinColorSkins{
    @ViewChild('nav', {read: DragScrollComponent, static:false}) ds: DragScrollComponent;
  
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