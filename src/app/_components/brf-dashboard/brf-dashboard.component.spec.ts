import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrfDashboardComponent } from './brf-dashboard.component';

describe('BrfDashboardComponent', () => {
  let component: BrfDashboardComponent;
  let fixture: ComponentFixture<BrfDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrfDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrfDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
