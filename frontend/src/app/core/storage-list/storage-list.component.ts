import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ForestryResource} from "../../_interfaces/ForestryResource";
import {ForestryStorageService} from "../../_services/forestry-storage.service";
import {IForestryStorage} from "../../_interfaces/forestry-storage";

@Component({
  selector: 'app-storage-list',
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss'],
})
export class StorageListComponent implements OnInit {

  @ViewChild('errorModal') errorModal: any;
  modalReference: NgbModalRef;

  resources: ForestryResource[];
  id: number;

  iForestryStorage: IForestryStorage;

  constructor(private storageService: ForestryStorageService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.iForestryStorage = storageService;
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id || null;
    this.loadResources();
  }

  loadResources(): void {
    this.iForestryStorage.getForestryResources(this.id).subscribe(
      resources => {
        if (resources.length < 1) {
          this.modalService.open(this.errorModal).result.then(() => this.loadResources());
        }
        this.resources = resources;
      },
      () => this.modalService.open(this.errorModal).result.then(() => this.loadResources()),
    );
  }
}
