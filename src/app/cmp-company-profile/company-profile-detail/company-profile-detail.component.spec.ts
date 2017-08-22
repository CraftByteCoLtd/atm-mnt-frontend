import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileDetailComponent } from './company-profile-detail.component';

describe('CompanyProfileDetailComponent', () => {
  let component: CompanyProfileDetailComponent;
  let fixture: ComponentFixture<CompanyProfileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
