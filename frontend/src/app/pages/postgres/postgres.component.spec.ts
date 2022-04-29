import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostgresComponent } from './postgres.component';

describe('PostgresComponent', () => {
  let component: PostgresComponent;
  let fixture: ComponentFixture<PostgresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostgresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostgresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
