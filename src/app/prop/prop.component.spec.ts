import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropComponent } from './prop.component';

describe('PropComponent', () => {
  let component: PropComponent;
  let fixture: ComponentFixture<PropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
