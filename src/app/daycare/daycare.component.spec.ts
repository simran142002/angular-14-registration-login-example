import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaycareComponent } from './daycare.component';

describe('DaycareComponent', () => {
  let component: DaycareComponent;
  let fixture: ComponentFixture<DaycareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaycareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaycareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
