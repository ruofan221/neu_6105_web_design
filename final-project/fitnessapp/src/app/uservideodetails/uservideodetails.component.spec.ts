import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UservideodetailsComponent } from './uservideodetails.component';

describe('UservideodetailsComponent', () => {
  let component: UservideodetailsComponent;
  let fixture: ComponentFixture<UservideodetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UservideodetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UservideodetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
