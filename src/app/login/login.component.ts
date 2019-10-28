import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient, private authService:AuthenticationService ) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(email, password).subscribe(
      resData => {
        console.log(resData);
      },
      error => {
        console.log(error);
      }
    );
    form.reset();
  }
}