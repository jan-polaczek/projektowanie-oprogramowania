import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Sensor} from '../../_interfaces/Sensor';
import {ISensorList} from '../../_interfaces/sensor-service';
import {SensorService} from '../../_services/sensor.service';
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
  id: number;

  iSensorService: ISensorList;

  constructor(private sensorService: SensorService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.iSensorService = sensorService;
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id || null;
    this.loadSensors();
  }

  loadSensors(): void {
    this.iSensorService.getSensors().subscribe(
      sensors => {
        this.sensors = sensors;
        if (this.id !== null && this.sensors.find(sensor => sensor.id === this.id)) {
          this.openDetails(this.id);
        }
      },
      () => this.modalService.open(this.errorModal).result.then(() => this.loadSensors()),
    );
  }

  openDetails(sensorId: number): void {
    const sensor = this.sensors.find(sensorEl => sensorEl.id === sensorId);
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
