import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Home',  icon: 'ni-shop text-orange', class: '' },
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/hostsconfig', title: 'Hosts Configuration',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/hostselect', title: 'Hosts Selection',  icon:'ni-single-02 text-primary', class: '' },
    { path: '/process', title: 'Process Selection',  icon:'ni-bullet-list-67 text-green', class: '' },
    { path: '/system', title: 'System',  icon:'ni-settings text-red', class: '' },
    { path: '/postgres', title: 'Postgres',  icon:'ni-settings text-orange', class: '' },
    { path: '/apache', title: 'Apache',  icon:'ni-settings text-green', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
