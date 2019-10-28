import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html'
})
 
export class AuthenticationComponent {

  constructor(private authService: AuthenticationService, private router: Router){}

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