import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @ViewChild('notificationModal') notificationModal: any;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  openNotification(): void {
    const modalRef = this.modalService.open(NotificationComponent);
    modalRef.result.then(() => {
      console.log('close');
    }, () => {
      console.log('dismiss');
    });
  }
}
