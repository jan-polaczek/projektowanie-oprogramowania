import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

  @Input() sensorId: number;

  constructor(public activeModal: NgbActiveModal,
              private router: Router) {
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  close(): void {
    this.activeModal.close();
    this.router.navigate(['sensor-list', this.sensorId]);
  }
}
