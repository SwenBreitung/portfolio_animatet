import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderResponsivDialogComponent } from './header-responsiv-dialog.component';

describe('HeaderResponsivDialogComponent', () => {
  let component: HeaderResponsivDialogComponent;
  let fixture: ComponentFixture<HeaderResponsivDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderResponsivDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderResponsivDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
