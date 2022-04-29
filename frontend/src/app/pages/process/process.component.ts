import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user';
import { host_app } from '../../interfaces/host';
import { Router } from '@angular/router';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  curruser : User;
  selectedHosts : host_app[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService, private router: Router) {
    this.auth.currentUser.subscribe(x => this.curruser = x);
  }

  ngOnInit() {
    this.http.post<any[]>('http://localhost:3080/user/nodes', {"username": this.curruser.username}).subscribe(data => {
      console.log(data);
      data.forEach(element => {
        this.selectedHosts.push(
          { node_id: element.node_id, name: element.name, ip: element.ip, postgres: false, apache: false }
        )
      });
      this.selectedHosts.sort((a, b) => a.node_id - b.node_id);
    });
  }

  selectProcess() {
    let sel= this.selectedHosts.filter(host => (host.postgres == true || host.apache == true));

    for (let host of sel) {
      if(host.postgres == true && host.apache == true) {
        this.http.post('http://localhost:3080/node/addapp', {"node_id": host.node_id, "name": "postgres"}).subscribe(data => {
          console.log(data);
          this.http.post('http://localhost:3080/node/addapp', {"node_id": host.node_id, "name": "apache"}).subscribe(data => {
            console.log(data);
          });
        });
      }
      else if (host.postgres == true && host.apache == false) {
        this.http.post('http://localhost:3080/node/addapp', {"node_id": host.node_id, "name": "postgres"}).subscribe(data => {
          console.log(data);
        });
      }
      else if (host.apache == true && host.postgres == false) {
        this.http.post('http://localhost:3080/node/addapp', {"node_id": host.node_id, "name": "apache"}).subscribe(data => {
          console.log(data);
        });
      }
    }
    this.router.navigate(['/dashboard']);
  }

}
