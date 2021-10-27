import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForestryFormComponent} from './forestry-form.component';

describe('ForestryFormComponent', () => {
  let component: ForestryFormComponent;
  let fixture: ComponentFixture<ForestryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForestryFormComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
