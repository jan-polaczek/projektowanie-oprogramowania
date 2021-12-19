import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ForestationDeforestationService} from "../../_services/forestation-deforestation.service";
import {ForestryAction} from "../../_interfaces/ForestryAction";

@Component({
  selector: 'app-forestry-actions-list',
  templateUrl: './planned-actions-list.component.html',
  styleUrls: ['./planned-actions-list.component.scss']
})
export class PlannedActionsListComponent implements OnInit {

  forestryId: number
  plannedActions: ForestryAction[];

  constructor(private route: ActivatedRoute,
              private forestationDeforestationService: ForestationDeforestationService) {
  }

  ngOnInit(): void {
    this.forestryId = this.route.snapshot.params.id;
    this.plannedActions = [];

    this.forestationDeforestationService.getForestations(this.forestryId).subscribe(forestations => {
      forestations.forEach(forestation => forestation.typeId = 1)
      this.plannedActions.push(...forestations);
    })

    this.forestationDeforestationService.getDeforestations(this.forestryId).subscribe(deforestations => {
      deforestations.forEach(deforestation => deforestation.typeId = 2)
      this.plannedActions.push(...deforestations);
    })
  }
}
