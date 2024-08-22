import { Component } from '@angular/core';
import { LayoutService } from './../../service/layout.service'
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../service/translate.service';
@Component({
  selector: 'app-header-responsiv-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-responsiv-dialog.component.html',
  styleUrl: './header-responsiv-dialog.component.scss'
})
export class HeaderResponsivDialogComponent {
  constructor(
    public layoutService:LayoutService,
    public translateService:TranslateService,
  ){}
  
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.layoutService.isDialogOpen =false;
    } else {
      console.warn(`Element with ID ${sectionId} not found!`);
    }
  }
  closeMenu(){
    this.layoutService.isDialogOpen =false;
  }

  
  switchTranslateToEnglish(){
    this.translateService.de= false;
    this.translateService.en= true;
    this.layoutService.isDialogOpen =false;
  }
  
  switchTranslateToGerman(){
    this.translateService.de= true;
    this.translateService.en= false;
    this.layoutService.isDialogOpen =false;
  }
}
