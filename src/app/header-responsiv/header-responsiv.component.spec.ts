import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderResponsivComponent } from './header-responsiv.component';

describe('HeaderResponsivComponent', () => {
  let component: HeaderResponsivComponent;
  let fixture: ComponentFixture<HeaderResponsivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderResponsivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderResponsivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
