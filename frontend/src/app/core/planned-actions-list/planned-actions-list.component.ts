import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ForestryAction} from '../../_interfaces/ForestryAction';
import {ForestationDeforestationService} from '../../_services/forestation-deforestation.service';


@Component({
  selector: 'app-forestry-actions-list',
  templateUrl: './planned-actions-list.component.html',
  styleUrls: ['./planned-actions-list.component.scss'],
})
export class PlannedActionsListComponent implements OnInit {

  @ViewChild('infoModal') infoModal: any;

  forestryId: number;
  plannedActions: ForestryAction[];

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private forestationDeforestationService: ForestationDeforestationService) {
  }

  ngOnInit(): void {
    this.forestryId = this.route.snapshot.params.id;
    this.plannedActions = [];

    this.forestationDeforestationService.getForestations(this.forestryId).subscribe(forestations => {
      forestations.forEach(forestation => forestation.typeId = 1);
      this.plannedActions.push(...forestations);
    });

    this.forestationDeforestationService.getDeforestations(this.forestryId).subscribe(deforestations => {
      deforestations.forEach(deforestation => deforestation.typeId = 2);
      this.plannedActions.push(...deforestations);
    });
  }

  openInfoModal(): void {
    this.modalService.open(this.infoModal, {centered: true})
      .result.then(() => {
      // wyslij zarejestrowanie akcji
    });
  }

}
