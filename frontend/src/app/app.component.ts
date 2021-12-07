import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {INotification} from './_interfaces/sensor-notification-service';
import {SensorNotificationService} from './_services/sensor-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pop';

  iSensorNotificationService: INotification;

  constructor(private sensorNotificationService: SensorNotificationService) {
    this.iSensorNotificationService = sensorNotificationService;
  }

  ngOnInit(): void {
    this.iSensorNotificationService.connect(environment.sensorNotificationUrl);
  }

  ngOnDestroy(): void {
    this.iSensorNotificationService.disconnect();
  }

}
