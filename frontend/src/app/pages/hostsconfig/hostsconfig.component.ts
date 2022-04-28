import { Component, OnInit } from '@angular/core';
import { host } from '../../interfaces/host';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hostsconfig',
  templateUrl: './hostsconfig.component.html',
  styleUrls: ['./hostsconfig.component.scss']
})

export class HostsconfigComponent implements OnInit {
  hosts: host[] = [
    {node_id: 1, name: 'node1', ip: '10.1.1.1',  new_ip: '', selected: true},
    {node_id: 2, name: 'node2', ip: '10.1.1.2',  new_ip: '', selected: true},
    {node_id: 3, name: 'node3', ip: '10.1.1.3',  new_ip: '', selected: true},
  ];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    
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
        }
        else {
          host.new_ip = '';
        }
      }
    });
  }

  updateHosts() {
    this.http.post('http://localhost:3080/node/update', this.hosts).subscribe(data => {
      console.log(data);
    });
  }

}
