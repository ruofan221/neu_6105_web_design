import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachVideoComponent } from './coach-video.component';

describe('CoachVideoComponent', () => {
  let component: CoachVideoComponent;
  let fixture: ComponentFixture<CoachVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
