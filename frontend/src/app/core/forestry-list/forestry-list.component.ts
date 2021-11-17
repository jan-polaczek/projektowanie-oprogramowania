import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Forestry} from '../../_interfaces/Forestry';
import {IForestryList} from '../../_interfaces/forestry-service';
import {ForestryService} from '../../_services/forestry.service';

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

  iForestryService: IForestryList;

  constructor(private forestryService: ForestryService,
              private modalService: NgbModal) {
    this.iForestryService = forestryService;
  }

  ngOnInit(): void {
    this.loadForestries();
  }

  openDeleteModal(targetForestry: Forestry): void {
    this.targetForestryName = targetForestry.name;

    this.modalService.open(this.deleteModal, {centered: true})
      .result.then(() => {
      if (this.forestryNameNgModel === this.targetForestryName) {
        this.iForestryService.deleteForestry(targetForestry.forestry_id).subscribe(() => {
          this.loadForestries();
        });
      }
    }, (reason) => {
      console.log(reason);
    });

    this.forestryNameNgModel = '';
  }

  loadForestries(): void {
    this.iForestryService.getForestries().subscribe(
      forestries => this.forestries = forestries,
      () => this.modalService.open(this.errorModal).result.then(() => this.loadForestries()),
    );
  }
}
