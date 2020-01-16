import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfigurationsComponent } from 'src/app/app-configurations/app-configurations.component';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private http: HttpClient, private session: SessionService,private router: Router, private route: ActivatedRoute, private configuration: AppConfigurationsComponent) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    this.http.post('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/forgotPassword?playerEmail=' + email , {email}).subscribe(resData => {
      console.log(resData);
    });
      this.router.navigate(['/login'], { relativeTo: this.route });

  }
}