import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { HostsconfigComponent } from '../../pages/hostsconfig/hostsconfig.component';
import { HostselectComponent } from 'src/app/pages/hostselect/hostselect.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProcessComponent } from 'src/app/pages/process/process.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SystemComponent } from 'src/app/pages/system/system.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgApexchartsModule
  ],
  declarations: [
    DashboardComponent,
    HostsconfigComponent,
    HostselectComponent,
    ProcessComponent,
    HomeComponent,
    SystemComponent
  ]
})

export class AdminLayoutModule {}
