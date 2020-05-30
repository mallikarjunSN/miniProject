import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterAcComponent } from './renter-ac.component';

describe('RenterAcComponent', () => {
  let component: RenterAcComponent;
  let fixture: ComponentFixture<RenterAcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenterAcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
