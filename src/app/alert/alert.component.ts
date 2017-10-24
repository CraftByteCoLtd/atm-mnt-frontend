import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from '../_models/alert.model';
import { AlertService } from '../_services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts.push(alert);

            // remove alert after 5 seconds
            setTimeout(() => this.removeAlert(alert), 5000);

        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success animated bounce';
            case AlertType.Error:
                return 'alert alert-danger animated bounce';
            case AlertType.Info:
                return 'alert alert-info animated bounce';
            case AlertType.Warning:
                return 'alert alert-warning animated bounce';
        }
    }

}
