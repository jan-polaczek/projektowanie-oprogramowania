import {Component, OnInit} from '@angular/core';
import {ForestryService} from "../../_services/forestry.service";
import {Forestry} from "../../_interfaces/Forestry";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-forestry-list',
  templateUrl: './forestry-list.component.html',
  styleUrls: ['./forestry-list.component.scss'],
})
export class ForestryListComponent implements OnInit {

  forestries: Forestry[];

  targetForestryName = '';
  forestryNameNgModel = '';

  constructor(private forestryService: ForestryService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.forestryService.getForestries().subscribe(forestries => this.forestries = forestries);
  }

  openDeleteModal(content, targetForestry: Forestry) {
    this.targetForestryName = targetForestry.name;

    this.modalService.open(content, {centered: true})
    .result.then(() => {
      if (this.forestryNameNgModel === this.targetForestryName)
        this.forestryService.deleteForestry(targetForestry.forestry_id).subscribe(forestries => this.forestries = forestries);
    }, (reason) => {
      console.log(reason)
    })

    this.forestryNameNgModel = '';
  }
}
