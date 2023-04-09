import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogProfileComponent } from './dog-profile.component';

describe('DogProfileComponent', () => {
  let component: DogProfileComponent;
  let fixture: ComponentFixture<DogProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DogProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
