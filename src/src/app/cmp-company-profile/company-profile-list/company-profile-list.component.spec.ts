import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfileListComponent } from './company-profile-list.component';

describe('CompanyProfileListComponent', () => {
  let component: CompanyProfileListComponent;
  let fixture: ComponentFixture<CompanyProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
