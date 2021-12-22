import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {IForestationForm} from '../../_interfaces/ForestryAction';
import {ForestationDeforestationService} from '../../_services/forestation-deforestation.service';

@Component({
  selector: 'app-forestation-form',
  templateUrl: './forestation-form.component.html',
  styleUrls: ['./forestation-form.component.scss'],
})
export class ForestationFormComponent implements OnInit {

  forestationForm: FormGroup;
  submitted = false;
  forestryId: number;
  iForestationForm: IForestationForm;

  constructor(public forestationDeforestationService: ForestationDeforestationService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              public fb: FormBuilder) {
    this.forestationForm = this.fb.group({
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

  saveForestation(content): void {
    this.submitted = true;
    if (this.forestationForm.valid) {
      this.modalService.open(content, {centered: true}).result
        .then(() => {
          this.forestationDeforestationService.addForestation(this.forestryId,
            {
              region: null,
              plant_type: this.forestationForm.value.plant_type,
              start_date: this.forestationForm.value.start_date,
              end_date: this.forestationForm.value.end_date,
              number_of_trees: this.forestationForm.value.number_of_trees,
            }).subscribe(() => {
            this.router.navigate(['/planned-actions-list/' + this.forestryId]);
          });
        }, () => {
          console.log('dismiss');
        });
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.forestationForm.controls;
  }
}
