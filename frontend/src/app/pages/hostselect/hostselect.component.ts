import { Component, OnInit } from '@angular/core';
import { host } from '../../interfaces/host';

@Component({
  selector: 'app-hostselect',
  templateUrl: './hostselect.component.html',
  styleUrls: ['./hostselect.component.scss']
})
export class HostselectComponent implements OnInit {

  hosts: host[] = [
    {node_id: 1, name: 'node1', ip: '10.1.1.1',  new_ip: '', selected: true},
    {node_id: 2, name: 'node2', ip: '10.1.1.2',  new_ip: '', selected: true},
    {node_id: 3, name: 'node3', ip: '10.1.1.3',  new_ip: '', selected: true},
  ];

  constructor() { }

  ngOnInit() {
    
  }

  selectHosts() {
    let selectedHosts = this.hosts.filter(host => host.selected == true);
    return selectedHosts;
  }

}
