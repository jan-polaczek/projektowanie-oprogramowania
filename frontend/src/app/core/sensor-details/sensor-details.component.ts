import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SensorService} from '../../_services/sensor.service';

@Component({
  selector: 'app-forestry-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss'],
})
export class SensorDetailsComponent implements OnInit {
  @Input() sensor;

  value: number;
  valueMin: number;
  valueMax: number;

  constructor(
    public activeModal: NgbActiveModal,
    private sensorService: SensorService
  ) {}

  ngOnInit(): void {
    const lastMidnight = new Date(new Date().setHours(0, 0, 0, 0));
    const nextMidnight = new Date(new Date().setHours(24, 0, 0, 0));
    console.log(lastMidnight);
    console.log(nextMidnight);
    this.sensorService.getSensorDataById(this.sensor.id).subscribe(
      sensorData => {
        this.value = sensorData[0].value;
        this.valueMin = Math.min(...sensorData.map(v => v.value));
        this.valueMax = Math.max(...sensorData.map(v => v.value));
      },
      () => {
      },
    );
  }

  dismiss(): void {
    this.activeModal.close();
  }
}
