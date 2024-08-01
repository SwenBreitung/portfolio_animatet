import { Component } from '@angular/core';
import { TranslateService } from './../service/translate.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.scss'
})
export class ImpressumComponent {
  constructor(public translateService: TranslateService,
    private router: Router
  ) {

  }

}
