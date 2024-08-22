import { Component, OnInit,NgModule, Renderer2, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from './../../../service/layout.service'
import { DisplacementSphereComponent } from "./../../../animationen/displacement-sphere/displacement-sphere.component";
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [DisplacementSphereComponent,CommonModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit{
  words: string[] = ['Fullstack&nbsp;', 'Frontend&nbsp;', 'Backend&nbsp;','Web&nbsp;'];
  currentWord: string = 'Web';
  currentIndex: number = 0;
  intervalId: any;
  isVisible: boolean = true;

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
  public layoutService:LayoutService
) {}
  ngOnInit() {
    this.startWordRotation();
    this.checkScroll();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startWordRotation() {
    this.updateWord();
    this.intervalId = setInterval(() => {
      this.updateWord();
    }, 10000);
  }


  updateWord() {
    this.currentWord = this.words[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.words.length;

    
    const textElement = this.el.nativeElement.querySelector('.header-text');
    const bgElement = this.el.nativeElement.querySelector('.background-animation');
    const lineElement = this.el.nativeElement.querySelector('.line');
    this.renderer.removeClass(textElement, 'header-text');
    this.renderer.removeClass(bgElement, 'background-animation');
    this.renderer.removeClass(lineElement, 'line');
    void textElement.offsetWidth; 
    void bgElement.offsetWidth;
    this.renderer.addClass(textElement, 'header-text');
    this.renderer.addClass(bgElement, 'background-animation');
    this.renderer.addClass(lineElement, 'line');
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const indicator = this.el.nativeElement.querySelector('.scroll-indicator');

    if (scrollPosition >= 200) {
      this.renderer.addClass(indicator, 'fade');
      setTimeout(() => {
        this.renderer.addClass(indicator, 'hidden');
      }, 500); // Match the duration of the fade-out animation
    } else {
      this.renderer.removeClass(indicator, 'hidden');
      setTimeout(() => {
        this.renderer.removeClass(indicator, 'fade');
      }, 10); // Small delay to ensure classes are added/removed correctly
    }
  }


}
