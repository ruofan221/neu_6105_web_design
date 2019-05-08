import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachUploadComponent } from './coach-upload.component';

describe('CoachUploadComponent', () => {
  let component: CoachUploadComponent;
  let fixture: ComponentFixture<CoachUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoachUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
