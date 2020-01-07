import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warning-login',
  templateUrl: './warning-login.component.html',
  styleUrls: ['./warning-login.component.css']
})
export class WarningLoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirectLogin(){
    this.router.navigate(['../login'], {relativeTo: this.route});
  }

}
