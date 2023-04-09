import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcheckupComponent } from './healthcheckup.component';

describe('HealthcheckupComponent', () => {
  let component: HealthcheckupComponent;
  let fixture: ComponentFixture<HealthcheckupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthcheckupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthcheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
