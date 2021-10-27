import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForestryDetailsComponent} from './forestry-details.component';

describe('ForestryDetailsComponent', () => {
  let component: ForestryDetailsComponent;
  let fixture: ComponentFixture<ForestryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForestryDetailsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
