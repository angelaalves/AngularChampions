import { Component, OnInit, Injectable } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-app-configurations',
  templateUrl: './app-configurations.component.html',
  styleUrls: ['./app-configurations.component.css']
})
@Injectable({ providedIn: 'root' })
export class AppConfigurationsComponent implements OnInit {
  private backEndIp: string = "localhost";
  private backEndPort = "8085";
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  configurationsReader() {
    this.http.get("assets/configurations.txt", { responseType: 'text' }).subscribe(data => {
      var elements = data.split("\n");
      this.backEndIp = elements[0].split(":")[1];
      this.backEndPort = elements[1].split(":")[1];
    })
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
    this.http.post('http://' + this.backEndIp + ":" + this.backEndPort + "/configuration/saveConfigFile?IP=" + this.backEndIp + "&port=" + this.backEndPort + "&DBip=" + form.value.DBip + "&DBport=" + form.value.DBport + "&DBAdmin=" + form.value.DBAdmin + "&DBPassword=" + form.value.DBPassword, {}).subscribe()
  }
}
