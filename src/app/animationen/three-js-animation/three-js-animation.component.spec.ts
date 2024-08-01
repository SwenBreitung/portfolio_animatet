import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeJsAnimationComponent } from './three-js-animation.component';

describe('ThreeJsAnimationComponent', () => {
  let component: ThreeJsAnimationComponent;
  let fixture: ComponentFixture<ThreeJsAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreeJsAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreeJsAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
