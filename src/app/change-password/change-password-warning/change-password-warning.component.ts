import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password-warning',
  templateUrl: './change-password-warning.component.html',
  styleUrls: ['./change-password-warning.component.css']
})
export class ChangePasswordWarningComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirectChangePassword(){
    this.router.navigate(['../change_password'], {relativeTo: this.route});
  }

}
