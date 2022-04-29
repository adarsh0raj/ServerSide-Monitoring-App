import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { HostsconfigComponent } from '../../pages/hostsconfig/hostsconfig.component';
import { HostselectComponent } from 'src/app/pages/hostselect/hostselect.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ProcessComponent } from 'src/app/pages/process/process.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SystemComponent } from 'src/app/pages/system/system.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'home',           component: HomeComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'system/:id',     component: SystemComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'hostsconfig',    component: HostsconfigComponent },
    { path: 'hostselect',     component: HostselectComponent },
    { path: 'process',        component: ProcessComponent}
];
