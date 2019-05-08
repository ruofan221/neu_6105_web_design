import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UservideoComponent } from './uservideo.component';

describe('UservideoComponent', () => {
  let component: UservideoComponent;
  let fixture: ComponentFixture<UservideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UservideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UservideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
