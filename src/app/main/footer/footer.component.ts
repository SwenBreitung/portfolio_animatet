import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private router: Router) {}

  openImpressumInNewTab() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/impressum'])
    );
    window.open(url, '_blank');
  }
}
