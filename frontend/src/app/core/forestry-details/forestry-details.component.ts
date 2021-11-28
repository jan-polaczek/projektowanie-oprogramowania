import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Forestry} from "../../_interfaces/Forestry";

@Component({
  selector: 'app-forestry-details',
  templateUrl: './forestry-details.component.html',
  styleUrls: ['./forestry-details.component.scss'],
})
export class ForestryDetailsComponent implements OnInit {

  @Input() forestry: Forestry

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.activeModal.close();
  }
}
