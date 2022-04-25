import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostsconfigComponent } from './hostsconfig.component';

describe('HostsconfigComponent', () => {
  let component: HostsconfigComponent;
  let fixture: ComponentFixture<HostsconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostsconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostsconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
