import { AfterViewInit, Component,ElementRef  } from '@angular/core';
import{ ChevronIconComponent } from './../../../ui-components/chevron-icon/chevron-icon.component'
import { HoverButtonComponent } from "../../../ui-components/hover-button/hover-button.component";
import { TranslateService } from "./../../../service/translate.service"
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [ChevronIconComponent, HoverButtonComponent,CommonModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit{
  private japaneseChars: string[] = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"];
  isVisible = false;
  constructor(
    private elementRef: ElementRef,   
    public translateService:TranslateService,
  ) {}

  ngAfterViewInit() {
    const animationContainer = this.elementRef.nativeElement.querySelector('#animation-container');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startAnimations();
          observer.unobserve(animationContainer);
        }
      });
    });

    observer.observe(animationContainer);
  }

  private startAnimations() {
    const animation = this.elementRef.nativeElement.querySelector('#animation');
    const heroImage = this.elementRef.nativeElement.querySelector('#hero-image');
    animation.style.animation = 'slideIn 2s forwards';
    setTimeout(() => {
      heroImage.style.opacity = '1';
    }, 500);

    animation.addEventListener('animationend', () => {
      animation.style.display = 'none';
    });

    const spans = this.elementRef.nativeElement.querySelectorAll('.animated-text h2');
    spans.forEach((span: HTMLElement, index: number) => {
      span.style.animationDelay = `${index * 0.5}s`;
      this.animateCharacter(span, index * 0.5);
    });
 
    setTimeout(() => {
      this.isVisible = true; // Nach 4 Sekunden auf true setzen
    }, 4000);

  }

  private animateCharacter(span: HTMLElement, delay: number) {
    setTimeout(() => {
      let animationSteps = 5;
      let interval = 800 / (animationSteps + 1);
      let count = 0;

      const intervalId = setInterval(() => {
        if (count < animationSteps) {
          span.textContent = this.japaneseChars[Math.floor(Math.random() * this.japaneseChars.length)];
          span.style.opacity = "1";
          count++;
        } else {
          clearInterval(intervalId);
          let finalText = span.getAttribute('data-final-text');
          span.textContent = finalText === ' ' ? '\u00A0' : finalText; 
          span.style.opacity = "1";
        }
      }, interval);
    }, delay * 1000);
  }
}
