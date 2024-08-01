
import { Component } from '@angular/core';
import { TranslateService } from './../service/translate.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent {
  constructor(
    public translateService: TranslateService,
    private router: Router) {}


    ngOnInit() {
      this.router.events.subscribe((event) => {  
        if (event instanceof NavigationEnd) {   
          window.scrollTo(0, 0);
        }
      });
    }

}
