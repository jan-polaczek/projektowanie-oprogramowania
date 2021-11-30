import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MapDetailsComponent} from './forestry-list.component';

describe('ForestryListComponent', () => {
  let component: MapDetailsComponent;
  let fixture: ComponentFixture<MapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapDetailsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
