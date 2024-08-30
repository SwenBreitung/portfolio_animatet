
import { Component } from '@angular/core';
import { TranslateService } from './../service/translate.service';
import { NavigationEnd, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent {
  lang: string = '';
  constructor(
    public translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute) {}

    

    ngOnInit() {
      this.lang = this.route.snapshot.paramMap.get('lang') || '';
      console.log('Aktuelle Sprache:', this.lang);
      this.router.events.subscribe((event) => {  
        if (event instanceof NavigationEnd) {   
          window.scrollTo(0, 0);
        }
      });
      this.setTextBasedOnLanguage();
    }

    
  setTextBasedOnLanguage(): void {
    if (this.lang === 'de') {
      this.translateService.de =true;
      this.translateService.en =false;
    } else if (this.lang === 'en') {
      this.translateService.de =false;
      this.translateService.en =true;
    }
  }
}
