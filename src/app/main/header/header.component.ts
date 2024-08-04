import { Component } from '@angular/core';
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

  switchTranslateToEnglish(){
    this.translateService.de= false;
    this.translateService.en= true;
  }
  
  switchTranslateToGerman(){
    this.translateService.de= true;
    this.translateService.en= false;
  }
  
}
