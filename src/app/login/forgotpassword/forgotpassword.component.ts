import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private http: HttpClient, private session: SessionService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const pass= Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    const email = form.value.email;
    this.http.post('http://localhost:8085/players/forgotPasswordMail?playerEmail=' + email + '&randomPass=' + pass, {email,pass}).subscribe(resData => {
      console.log(resData);
    })
  }
}