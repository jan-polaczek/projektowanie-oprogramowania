import {Component, OnInit, ViewChild} from '@angular/core';
import {ForestryService} from "../../_services/forestry.service";
import {Forestry} from "../../_interfaces/Forestry";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-forestry-list',
  templateUrl: './forestry-list.component.html',
  styleUrls: ['./forestry-list.component.scss'],
})
export class ForestryListComponent implements OnInit {

  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('errorModal') errorModal: any;

  forestries: Forestry[];

  targetForestryName = '';
  forestryNameNgModel = '';

  constructor(private forestryService: ForestryService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.loadForestries()
  }

  openDeleteModal(targetForestry: Forestry) {
    this.targetForestryName = targetForestry.name;

    this.modalService.open(this.deleteModal, {centered: true})
    .result.then(() => {
      if (this.forestryNameNgModel === this.targetForestryName)
        this.forestryService.deleteForestry(targetForestry.forestry_id).subscribe(forestries => this.forestries = forestries);
    }, (reason) => {
      console.log(reason)
    })

    this.forestryNameNgModel = '';
  }

  loadForestries() {
    this.forestryService.getForestries().subscribe(
      forestries => this.forestries = forestries,
      () => this.modalService.open(this.errorModal).result.then(() => this.loadForestries())
    );
  }
}
