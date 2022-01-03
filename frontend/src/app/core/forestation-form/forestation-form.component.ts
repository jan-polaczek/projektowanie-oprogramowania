import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IForestationForm} from '../../_interfaces/ForestryAction';
import {ForestationDeforestationService} from '../../_services/forestation-deforestation.service';
import {ForestryMapComponent} from '../map/forestry-map.component';

@Component({
  selector: 'app-forestation-form',
  templateUrl: './forestation-form.component.html',
  styleUrls: ['./forestation-form.component.scss'],
})
export class ForestationFormComponent implements OnInit {

  forestationForm: FormGroup = new FormGroup({
    region: new FormControl(''),
    plant_type: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required, this.dateValidator()]),
    end_date: new FormControl('', [Validators.required, this.dateValidator()]),
    number_of_trees: new FormControl('', [Validators.required]),
  });
  submitted = false;
  forestryId: number;
  iForestationForm: IForestationForm;

  @ViewChild(ForestryMapComponent) map: ForestryMapComponent;

  constructor(public forestationDeforestationService: ForestationDeforestationService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.forestryId = this.route.snapshot.params.id;
  }

  saveForestation(content): void {
    this.submitted = true;
    if (this.forestationForm.valid) {
      this.modalService.open(content, {centered: true}).result
        .then(() => {
          this.forestationDeforestationService.addForestation(this.forestryId,
            {
              region: this.map.getRegion(),
              plant_type: this.forestationForm.get('plant_type').value,
              start_date: new Date(this.forestationForm.get('start_date').value.split('-')[2],
                this.forestationForm.get('start_date').value.split('-')[1] - 1,
                this.forestationForm.get('start_date').value.split('-')[0]),
              end_date: new Date(this.forestationForm.get('end_date').value.split('-')[2],
                this.forestationForm.get('end_date').value.split('-')[1] - 1,
                this.forestationForm.get('end_date').value.split('-')[0]),
              number_of_trees: this.forestationForm.get('number_of_trees').value,
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
