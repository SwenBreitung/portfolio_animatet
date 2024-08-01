import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private router: Router) {}
  dialogGit = false;
  navigateToMainAndScroll(sectionId: string): void {
    this.router.navigate(['/main']).then(() => {
      this.scrollToSection(sectionId);
    });
  }
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  torgleDialog(){
    this.dialogGit = !this.dialogGit;
  }
}
