import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForestryListComponent} from './forestry-list.component';

describe('ForestryListComponent', () => {
  let component: ForestryListComponent;
  let fixture: ComponentFixture<ForestryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForestryListComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
