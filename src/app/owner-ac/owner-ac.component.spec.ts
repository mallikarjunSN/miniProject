import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAcComponent } from './owner-ac.component';

describe('OwnerAcComponent', () => {
  let component: OwnerAcComponent;
  let fixture: ComponentFixture<OwnerAcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerAcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
