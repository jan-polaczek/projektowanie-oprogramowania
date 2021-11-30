import {Component, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MapDetails} from "../../_interfaces/MapDetails";
import {TreeStandDetails} from "../../_interfaces/TreeStandDetails";

@Component({
  selector: 'app-map-details',
  templateUrl: './map-details.component.html',
  styleUrls: ['./map-details.component.scss'],
})
export class MapDetailsComponent {

  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('errorModal') errorModal: any;

  mapDetails: MapDetails = {
      area: 2000,
      smokeSensorCount: 2,
      countSomething: 5,
    }

  treeStandDetails: TreeStandDetails[] =  [
    {
      species: 'Sosna',
      count: 2,
    },
    {
      species: 'Jesion',
      count: 5,
    },
    {
      species: 'Buk',
      count: 2,
    },
    {
      species: 'Modrzew',
      count: 7,
    }]


  constructor(private modalService: NgbModal) {
  }


}
