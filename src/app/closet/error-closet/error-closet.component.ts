import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-closet',
  templateUrl: './error-closet.component.html',
  styleUrls: ['./error-closet.component.css']
})
export class ErrorClosetComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirectCloset(){
    this.router.navigate(['../change_password'], {relativeTo: this.route});
  }

}

