import { Component, OnInit, Injectable } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-app-configurations',
  templateUrl: './app-configurations.component.html',
  styleUrls: ['./app-configurations.component.css']
})
@Injectable({providedIn:'root'})
export class AppConfigurationsComponent implements OnInit {
  private backEndIp = "192.168.0.84";
  private backEndPort = "8085";

  constructor() { }

  ngOnInit() {
  }

  setBackEndIp(IP: string) {
    this.backEndIp = IP;
    return this.backEndIp
  }

  setBackEndPort(port: string) {
    this.backEndPort = port;
    return this.backEndPort;
  }

  getBackEndIP() {
    return this.backEndIp;
  }

  getBackEndPort() {
    return this.backEndPort;
  }

  onSubmit(form: NgForm) {
    if (form.value.ip != "") {
      this.setBackEndIp = form.value.ip;
    }
    if (form.value.port != "") {
      this.setBackEndPort = form.value.port;
    }
  }
}
