import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '../../service/translate.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(
  public translateService:TranslateService,
){}
@ViewChild('aboutMe') aboutMeSection!: ElementRef;

  switchTranslateToEnglish(){
    this.translateService.de= false;
    this.translateService.en= true;
    this.translateService.currentLang = 'en';
  }
  
  switchTranslateToGerman(){
    this.translateService.de = true;
    this.translateService.en = false;
    this.translateService.currentLang = 'de';
  }

  
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Element with ID ${sectionId} not found!`);
    }
  }
}

