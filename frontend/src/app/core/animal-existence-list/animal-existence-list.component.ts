import {Component, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AnimalExistence} from "../../_interfaces/AnimalExistence";

@Component({
  selector: 'app-animal-existence',
  templateUrl: './animal-existence-list.component.html',
  styleUrls: ['./animal-existence-list.component.scss'],
})
export class AnimalExistenceListComponent {

  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('errorModal') errorModal: any;

  animalExistences: AnimalExistence[] =  [
{
    species: 'animal',
    count: 2,
    last_date: new Date("Dec 08 2019"),
  },
    {
      species: 'animal2',
      count: 5,
      last_date: new Date("Dec 08 2019"),
    }]

  constructor(private modalService: NgbModal) {
  }


}
