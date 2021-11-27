import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Sensor} from '../../_interfaces/Sensor';
import {SensorService} from '../../_services/sensor.service';
import {ISensorList} from '../../_interfaces/sensor-service';
import {SensorDetailsComponent} from '../sensor-details/sensor-details.component';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
})
export class SensorListComponent implements OnInit {

  @ViewChild('errorModal') errorModal: any;
  modalReference: NgbModalRef;

  sensors: Sensor[];

  iSensorService: ISensorList;

  constructor(private sensorService: SensorService,
              private modalService: NgbModal) {
    this.iSensorService = sensorService;
  }

  ngOnInit(): void {
    this.loadSensors();
  }

  loadSensors(): void {
    this.iSensorService.getSensors().subscribe(
      sensors => this.sensors = sensors,
      () => this.modalService.open(this.errorModal).result.then(() => this.loadSensors()),
    );
    console.log(this.sensors);
  }

  openDetails(sensor: Sensor): void {
    const modalRef = this.modalService.open(SensorDetailsComponent,
      {
        windowClass: 'sensorDetails',
      });

    modalRef.componentInstance.sensor = sensor;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
  }
}
