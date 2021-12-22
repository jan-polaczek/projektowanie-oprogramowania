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
  plannedActions: ForestryAction[] = [];

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private forestationDeforestationService: ForestationDeforestationService) {
  }

  ngOnInit(): void {
    this.forestryId = this.route.snapshot.params.id;

    this.fetchPlannedActions();
  }

  fetchPlannedActions(): void {
    const plannedActions: ForestryAction[] = [];
    this.forestationDeforestationService.getForestations(this.forestryId).subscribe(forestations => {
      forestations.forEach(forestation => forestation.typeId = 1);
      plannedActions.push(...forestations);
    });

    this.forestationDeforestationService.getDeforestations(this.forestryId).subscribe(deforestations => {
      deforestations.forEach(deforestation => deforestation.typeId = 2);
      plannedActions.push(...deforestations);
    });
    this.plannedActions = plannedActions;
  }

  openInfoModal(): void {
    this.modalService.open(this.infoModal, {centered: true})
      .result.then(() => {
    });
  }

  removePlannedAction(action: ForestryAction): void {
    if (action.typeId === 1) {
      this.forestationDeforestationService.deleteForestation(this.forestryId, action.id).subscribe(() => {
        this.openInfoModal();
        this.plannedActions = this.plannedActions.filter(plannedAction => !(plannedAction.id === action.id && action.typeId === 1));
      });
    } else {
      this.forestationDeforestationService.deleteDeforestation(this.forestryId, action.id).subscribe(() => {
        this.openInfoModal();
        this.plannedActions = this.plannedActions.filter(plannedAction => !(plannedAction.id === action.id && action.typeId === 2));
      });
    }
  }
}
