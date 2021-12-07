import {Injectable} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {webSocket} from 'rxjs/webSocket';
import {SensorNotification} from '../_interfaces/sensor-notification';
import {NotificationComponent} from '../core/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class SensorNotificationService {

  notificationWebSocket;

  constructor(private modalService: NgbModal) {
  }

  connect(url: string): void {
    this.notificationWebSocket = webSocket(url);

    this.notificationWebSocket.subscribe((sensorNotification: SensorNotification) => {
      if (sensorNotification.type === 'notification') {
        const modalRef = this.modalService.open(NotificationComponent);
        modalRef.componentInstance.sensorId = sensorNotification.data.sensor_id;
        modalRef.result.then(() => {
        });
      }
    });
  }

  disconnect(): void {
    this.notificationWebSocket.complete();
  }
}
