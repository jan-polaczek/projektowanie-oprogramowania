import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AnimalExistence} from "../../_interfaces/AnimalExistence";
import {AnimalExistenceService} from "../../_services/animal-existence.service";

@Component({
  selector: 'app-animal-existence',
  templateUrl: './animal-existence-list.component.html',
  styleUrls: ['./animal-existence-list.component.scss'],
})
export class AnimalExistenceListComponent implements OnInit {

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

  ngOnInit(): void {
    // this.loadSensors();
  }

  constructor(private modalService: NgbModal,
              private animalExistenceService: AnimalExistenceService) {
  }

  loadSensors(): void {
    this.animalExistenceService.getAnimalExistences().subscribe(
      sensors => this.animalExistences = sensors,
      () => this.modalService.open(this.errorModal).result.then(() => this.loadSensors()),
    );
    console.log(this.animalExistences);
  }

}
