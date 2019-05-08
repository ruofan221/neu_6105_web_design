import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutvideosComponent } from './workoutvideos.component';

describe('WorkoutvideosComponent', () => {
  let component: WorkoutvideosComponent;
  let fixture: ComponentFixture<WorkoutvideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutvideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
