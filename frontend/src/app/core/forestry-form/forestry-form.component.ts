import {Component, OnInit} from '@angular/core';
import {ForestryService} from '../../_services/forestry.service';
import {Forestry} from '../../_interfaces/Forestry';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-forestry-form',
  templateUrl: './forestry-form.component.html',
  styleUrls: ['./forestry-form.component.scss'],
})
export class ForestryFormComponent implements OnInit {

   forestry: Forestry = {
    forestry_id: null,
    forest_district_id: null,
    forest_district_name: '',
    forester: '', // todo -> Employee
    name: '',
    area: 0,
  };
  submitted = false;
  id!: number;
  isAddMode!: boolean;
  registrationForm: FormGroup;

  constructor(public forestryService: ForestryService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              public fb: FormBuilder) {

    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      area: ['', [Validators.required]],
      forester: ['', [Validators.required]],
      forest_district_name: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.forestryService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.forestry = x;
          this.registrationForm.patchValue(x);
        });
    }
  }

  saveForestry(content): boolean {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      if (this.isAddMode) {
        this.forestryService.createForestry(
          {
            forestry_id: null,
            forest_district_id: null,
            forest_district_name: this.registrationForm.value.forest_district_name,
            forester: this.registrationForm.value.forester,
            name: this.registrationForm.value.name,
            area: this.registrationForm.value.area,
          })
          .subscribe(
            response => {
              this.modalService.open(content, {centered: true})
                .result.then(() => {this.router.navigateByUrl(''); }, () => {});
            },
            error => {console.log(error); });
      } else {
        this.forestryService.editForestry(
          {
            forestry_id: this.forestry.forestry_id,
            forest_district_id: this.forestry.forest_district_id,
            forest_district_name: this.registrationForm.value.forest_district_name,
            forester: this.registrationForm.value.forester,
            name: this.registrationForm.value.name,
            area: this.registrationForm.value.area,
          })
          .subscribe(
            response => {
              this.modalService.open(content, {centered: true})
                .result.then(() => {this.router.navigateByUrl(''); }, () => {});
            },
            error => {console.log(error); });
      }
    }
  }

  get form(): {[key: string]: AbstractControl} {
    return this.registrationForm.controls;
  }
}

