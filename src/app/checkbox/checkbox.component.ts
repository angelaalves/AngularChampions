import { Component, OnInit } from '@angular/core';
import { Video } from '../shared/video.model';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  public index:number;
  public checked: boolean;
  public name:string;

  constructor(index:number,  checked:boolean, name:string) { 
    this.index=index;
    this.checked=checked;
    this.name=this.name;
  }

  ngOnInit() {
  }

}
