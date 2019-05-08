import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercommentsComponent } from './usercomments.component';

describe('UsercommentsComponent', () => {
  let component: UsercommentsComponent;
  let fixture: ComponentFixture<UsercommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
