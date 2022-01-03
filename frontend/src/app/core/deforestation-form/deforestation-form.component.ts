import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ForestationDeforestationService} from '../../_services/forestation-deforestation.service';
import {ForestryMapComponent} from '../map/forestry-map.component';

@Component({
  selector: 'app-deforestation-form',
  templateUrl: './deforestation-form.component.html',
  styleUrls: ['./deforestation-form.component.scss'],
})
export class DeforestationFormComponent implements OnInit {

  deforestationForm: FormGroup = new FormGroup({
    region: new FormControl(''),
    plant_type: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required, this.dateValidator()]),
    end_date: new FormControl('', [Validators.required, this.dateValidator()]),
    number_of_trees: new FormControl('', [Validators.required]),
  });
  submitted = false;
  forestryId: number;

  @ViewChild(ForestryMapComponent) map: ForestryMapComponent;

  constructor(public forestationDeforestationService: ForestationDeforestationService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
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
              plant_type: this.deforestationForm.get('plant_type').value,
              start_date: new Date(this.deforestationForm.get('start_date').value.split('-')[2],
                this.deforestationForm.get('start_date').value.split('-')[1] - 1,
                this.deforestationForm.get('start_date').value.split('-')[0]),
              end_date: new Date(this.deforestationForm.get('end_date').value.split('-')[2],
                this.deforestationForm.get('end_date').value.split('-')[1] - 1,
                this.deforestationForm.get('end_date').value.split('-')[0]),
              number_of_trees: this.deforestationForm.get('number_of_trees').value,
            }).subscribe(() => {
            this.router.navigate(['/planned-actions-list/' + this.forestryId]);
          });
        }, () => {
          console.log('dismiss');
        });
    }
  }

  public dateValidator(): ValidatorFn {
    return ((control: AbstractControl): ValidationErrors | null => {
      return !!control.value && (control.value.split('-')[0] < 1
        || control.value.split('-')[0] > 31
        || control.value.split('-')[1] < 1
        || control.value.split('-')[1] > 12
        || control.value.split('-')[2] < 1900
        || control.value.split('-')[2] > 2100)
        ? {invalidDate: true} : null;
    });
  }
}
