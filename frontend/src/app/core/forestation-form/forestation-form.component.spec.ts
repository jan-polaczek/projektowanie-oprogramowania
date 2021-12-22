import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForestationFormComponent} from './forestation-form.component';

describe('ForestationFormComponent', () => {
  let component: ForestationFormComponent;
  let fixture: ComponentFixture<ForestationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForestationFormComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
