import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Forestry} from '../../_interfaces/Forestry';
import {ForestryMapComponent} from '../map/forestry-map.component';

@Component({
  selector: 'app-forestry-details',
  templateUrl: './forestry-details.component.html',
  styleUrls: ['./forestry-details.component.scss'],
})
export class ForestryDetailsComponent implements OnInit {

  @Input() forestry: Forestry;
  @ViewChild(ForestryMapComponent) child: ForestryMapComponent;
  @ViewChild('saveModal') saveModal: any;

  constructor(public activeModal: NgbActiveModal, public modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.activeModal.close();
  }

  saveMap(): void {
    this.modalService.open(this.saveModal, {centered: true})
      .result.then(() => {
      this.child.saveMap();
      this.activeModal.close();
    }, (reason) => {
    });
  }
}
