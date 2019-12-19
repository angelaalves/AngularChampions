import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-item',
  templateUrl: './checkbox-item.component.html',
  styleUrls: ['./checkbox-item.component.css']
})
export class CheckboxItemComponent {
  value: string;
  label: string;
  checked: boolean;

  constructor(value: any, label: any, checked?: boolean) {
    this.value = value;
    this.label = label;
    this.checked = checked ? checked : false;
  }
}