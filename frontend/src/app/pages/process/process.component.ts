import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user';
import { host } from '../../interfaces/host';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  curruser : User;
  selectedHosts : host[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.currentUser.subscribe(x => this.curruser = x);
  }

  ngOnInit() {
    this.http.post<any[]>('http://localhost:3080/user/nodes', {"username": this.curruser.username}).subscribe(data => {
      data.forEach(element => {
        this.selectedHosts.push(
          { node_id: element.node_id, name: element.name, ip: element.ip, new_ip: '', selected: true }
        )
      });
      this.selectedHosts.sort((a, b) => a.node_id - b.node_id);
    });
  }

}
