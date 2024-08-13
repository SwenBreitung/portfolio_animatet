import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRightComponent } from './button-right.component';

describe('ButtonRightComponent', () => {
  let component: ButtonRightComponent;
  let fixture: ComponentFixture<ButtonRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonRightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
