import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {first} from 'rxjs/operators';
import {Forestry} from '../../_interfaces/Forestry';
import {IForestryForm} from '../../_interfaces/forestry-service';
import {ForestryService} from '../../_services/forestry.service';

@Component({
  selector: 'app-forestry-form',
  templateUrl: './forestry-form.component.html',
  styleUrls: ['./forestry-form.component.scss'],
})
export class ForestryFormComponent implements OnInit {

  forestry: Forestry = {
    forestry_id: null,
    forestry_district_id: null,
    forestry_district_name: '',
    forester: null,
    name: '',
    area: 0,
  };
  submitted = false;
  id!: number;
  isAddMode!: boolean;
  registrationForm: FormGroup;
  iForestryService: IForestryForm;

  constructor(public forestryService: ForestryService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              public fb: FormBuilder) {
    this.iForestryService = forestryService;
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      area: ['', [Validators.required]],
      forester: ['', [Validators.required]],
      forestry_district_id: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.iForestryService.getForestryById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.forestry = x;
          this.registrationForm.patchValue(x);
        });
    }
  }

  saveForestry(content): boolean {
    console.log(this.registrationForm.getRawValue());
    this.submitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      if (this.isAddMode) {
        this.iForestryService.createForestry(
          {
            forestry_district: this.registrationForm.value.forestry_district_id,
            forester: this.registrationForm.value.forester,
            name: this.registrationForm.value.name,
            area: this.registrationForm.value.area,
          })
          .subscribe(
            () => {
              this.modalService.open(content, {centered: true})
                .result.then(() => {
                this.router.navigate(['forestry-list']);
              }, () => {
              });
            },
            error => {
              console.log(error);
            });
      } else {
        this.iForestryService.editForestry(this.forestry.forestry_id,
          {
            forestry_district: this.registrationForm.value.forestry_district_id,
            forester: this.registrationForm.value.forester,
            name: this.registrationForm.value.name,
            area: this.registrationForm.value.area,
          })
          .subscribe(
            () => {
              this.modalService.open(content, {centered: true})
                .result.then(() => {
                this.router.navigate(['forestry-list']);
              }, () => {
              });
            },
            error => {
              console.log(error);
            });
      }
    }
  }

  get form(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
}

