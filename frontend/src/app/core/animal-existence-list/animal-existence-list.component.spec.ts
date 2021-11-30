import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnimalExistenceListComponent} from './forestry-list.component';

describe('ForestryListComponent', () => {
  let component: AnimalExistenceListComponent;
  let fixture: ComponentFixture<AnimalExistenceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalExistenceListComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalExistenceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
