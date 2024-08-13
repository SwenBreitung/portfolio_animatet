import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '../../service/translate.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
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
  }
  
  switchTranslateToGerman(){
    this.translateService.de= true;
    this.translateService.en= false;
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

