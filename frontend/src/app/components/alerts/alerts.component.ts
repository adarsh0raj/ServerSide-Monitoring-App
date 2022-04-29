import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})

export class AlertsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        message.text = 'Success!';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        message.text = 'Error!';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}