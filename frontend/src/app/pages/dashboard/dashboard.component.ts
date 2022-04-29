import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host_det } from 'src/app/interfaces/host';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  hosts: host_det[] = [];
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
      });
      this.hosts.sort((a, b) => a.node_id - b.node_id);
    });
  }
}
