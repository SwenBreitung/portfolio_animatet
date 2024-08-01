import { AfterViewInit, Component,ElementRef  } from '@angular/core';
import{ ChevronIconComponent } from './../../../ui-components/chevron-icon/chevron-icon.component'
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [ChevronIconComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit{
  private japaneseChars: string[] = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"];

  constructor(private elementRef: ElementRef) {}

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
    const bild = this.elementRef.nativeElement.querySelector('#bild');

    // Start the slideIn animation
    animation.style.animation = 'slideIn 2s forwards';

    // Make the image visible halfway through the slideIn animation
    setTimeout(() => {
      bild.style.opacity = '1';
    }, 500);

    animation.addEventListener('animationend', () => {
      animation.style.display = 'none';
    });

    const spans = this.elementRef.nativeElement.querySelectorAll('.animated-text span');
    spans.forEach((span: HTMLElement, index: number) => {
      span.style.animationDelay = `${index * 0.5}s`;
      this.animateCharacter(span, index * 0.5);
    });
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
          span.textContent = finalText === ' ' ? '\u00A0' : finalText; // Leerzeichen explizit anzeigen
          span.style.opacity = "1";
        }
      }, interval);
    }, delay * 1000);
  }
}
