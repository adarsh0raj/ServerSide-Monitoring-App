import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostselectComponent } from './hostselect.component';

describe('HostselectComponent', () => {
  let component: HostselectComponent;
  let fixture: ComponentFixture<HostselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
