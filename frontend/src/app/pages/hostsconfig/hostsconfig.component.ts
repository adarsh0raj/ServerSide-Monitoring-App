import { Component, OnInit } from '@angular/core';
import { host } from '../../interfaces/host';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hostsconfig',
  templateUrl: './hostsconfig.component.html',
  styleUrls: ['./hostsconfig.component.scss']
})

export class HostsconfigComponent implements OnInit {
  // hosts: host[] = [
  //   {node_id: 1, name: 'node1', ip: '10.1.1.1',  new_ip: '', selected: true},
  //   {node_id: 2, name: 'node2', ip: '10.1.1.2',  new_ip: '', selected: true},
  //   {node_id: 3, name: 'node3', ip: '10.1.1.3',  new_ip: '', selected: true},
  // ];

  hosts: host[] = [];
  
  constructor(private http: HttpClient) { }

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

  ValidateIPaddress(ipaddress: string) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return true
    }
    else {
      return false
    }
  }

  changeIP(id: number) {
    this.hosts.map(host => {
      if (host.node_id == id) {
        if(this.ValidateIPaddress(host.new_ip)) {
          host.ip = host.new_ip;
          host.new_ip = '';
          this.http.post('http://localhost:3080/nodes/update', host).subscribe(data => {
            console.log(data);
          });
        }
        else {
          host.new_ip = '';
        }
      }
    });
  }

  // updateHosts() {
    
  // }

}
