import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachfollowervideosComponent } from './coachfollowervideos.component';

describe('CoachfollowervideosComponent', () => {
  let component: CoachfollowervideosComponent;
  let fixture: ComponentFixture<CoachfollowervideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachfollowervideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachfollowervideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
