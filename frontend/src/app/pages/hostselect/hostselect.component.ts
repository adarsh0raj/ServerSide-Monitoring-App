import { Component, OnInit } from '@angular/core';
import { host } from '../../interfaces/host';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-hostselect',
  templateUrl: './hostselect.component.html',
  styleUrls: ['./hostselect.component.scss']
})
export class HostselectComponent implements OnInit {

  // hosts: host[] = [
  //   {node_id: 1, name: 'node1', ip: '10.1.1.1',  new_ip: '', selected: true},
  //   {node_id: 2, name: 'node2', ip: '10.1.1.2',  new_ip: '', selected: true},
  //   {node_id: 3, name: 'node3', ip: '10.1.1.3',  new_ip: '', selected: true},
  // ];

  hosts : host[] = [];
  curruser: User;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.currentUser.subscribe(x => this.curruser = x);
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3080/nodes').subscribe(data => {
      data.forEach(element => {
        this.hosts.push(
          { node_id: element.node_id, name: element.name, ip: element.ip, new_ip: '', selected: true }
        )
      });
      this.hosts.sort((a, b) => a.node_id - b.node_id);
    });
  }

  selectHosts() {
    let selectedHosts = this.hosts.filter(host => host.selected == true);
    let node_ids = selectedHosts.map(host => host.node_id);

    for (let node of node_ids) {
      this.http.post('http://localhost:3080/user/addnode', {"username": this.curruser.username, "node_id": node}).subscribe(data => {
        console.log(data);
      });
    }
  }

}
