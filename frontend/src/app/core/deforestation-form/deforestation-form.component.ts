import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ForestationDeforestationService} from '../../_services/forestation-deforestation.service';
import {ForestryMapComponent} from "../map/forestry-map.component";

@Component({
  selector: 'app-deforestation-form',
  templateUrl: './deforestation-form.component.html',
  styleUrls: ['./deforestation-form.component.scss'],
})
export class DeforestationFormComponent implements OnInit {

  deforestationForm: FormGroup;
  submitted = false;
  forestryId: number;

  @ViewChild(ForestryMapComponent) map: ForestryMapComponent;

  constructor(public forestationDeforestationService: ForestationDeforestationService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              public fb: FormBuilder) {
    this.deforestationForm = this.fb.group({
      region: [''],
      plant_type: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      number_of_trees: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.forestryId = this.route.snapshot.params.id;
  }

  saveDeforestation(content): void {
    this.submitted = true;
    if (this.deforestationForm.valid) {
      this.modalService.open(content, {centered: true}).result
      .then(() => {
        this.forestationDeforestationService.addDeforestation(this.forestryId,
          {
            region: this.map.getRegion(),
            plant_type: this.deforestationForm.value.plant_type,
            start_date: new Date(this.deforestationForm.value.start_date),
            end_date: new Date(this.deforestationForm.value.end_date),
            number_of_trees: this.deforestationForm.value.number_of_trees,
          }).subscribe(() => {
          this.router.navigate(['/planned-actions-list/' + this.forestryId]);
        });
      }, () => {
        console.log('dismiss');
      });
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.deforestationForm.controls;
  }
}
