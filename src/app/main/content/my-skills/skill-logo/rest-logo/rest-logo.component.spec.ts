import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestLogoComponent } from './rest-logo.component';

describe('RestLogoComponent', () => {
  let component: RestLogoComponent;
  let fixture: ComponentFixture<RestLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
