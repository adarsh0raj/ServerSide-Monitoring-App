import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { HostsconfigComponent } from '../../pages/hostsconfig/hostsconfig.component';
import { HostselectComponent } from 'src/app/pages/hostselect/hostselect.component';
import { ProcessComponent } from 'src/app/pages/process/process.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SystemComponent } from 'src/app/pages/system/system.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',           component: HomeComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'system/:id',     component: SystemComponent },
    { path: 'hostsconfig',    component: HostsconfigComponent },
    { path: 'hostselect',     component: HostselectComponent },
    { path: 'process',        component: ProcessComponent}
];
