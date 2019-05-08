import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfollowingcoachvideosComponent } from './userfollowingcoachvideos.component';

describe('UserfollowingcoachvideosComponent', () => {
  let component: UserfollowingcoachvideosComponent;
  let fixture: ComponentFixture<UserfollowingcoachvideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfollowingcoachvideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfollowingcoachvideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
