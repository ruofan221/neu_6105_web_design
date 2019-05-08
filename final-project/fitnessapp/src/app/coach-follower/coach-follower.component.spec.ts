import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachFollowerComponent } from './coach-follower.component';

describe('CoachFollowerComponent', () => {
  let component: CoachFollowerComponent;
  let fixture: ComponentFixture<CoachFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachFollowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
