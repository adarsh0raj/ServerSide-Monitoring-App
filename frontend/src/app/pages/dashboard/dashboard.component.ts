import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host_det, host_app } from 'src/app/interfaces/host';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  hosts: host_det[] = [];
  hosts_data: host_app[] = [];
  curruser : User;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.currentUser.subscribe(x => this.curruser = x);
  }

  ngOnInit() {
    this.http.post<any[]>('http://localhost:3080/user/nodes', {"username": this.curruser.username}).subscribe(data => {
      data.forEach(element => {
        this.hosts.push(
          { node_id: element.node_id, name: element.name, ip: element.ip}
        )
        this.http.post<any[]>('http://localhost:3080/node/getapp', {"node_id": element.node_id}).subscribe(data => {
          if(data.length == 2) {
            this.hosts_data.push(
              { node_id: element.node_id, name: element.name, ip: element.ip, postgres: true, apache: true }
            )
          }
          else if(data.length == 1 && data[0].application_name == "postgres") {
            this.hosts_data.push(
              { node_id: element.node_id, name: element.name, ip: element.ip, postgres: true, apache: false }
            )
          }
          else if(data.length == 1 && data[0].application_name == "apache") {
            this.hosts_data.push(
              { node_id: element.node_id, name: element.name, ip: element.ip, postgres: false, apache: true }
            )
          }
          this.hosts_data.sort((a, b) => a.node_id - b.node_id);
        });
      });
      this.hosts.sort((a, b) => a.node_id - b.node_id);
    });
  }
}
