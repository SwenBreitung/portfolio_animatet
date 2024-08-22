import { Component } from '@angular/core';
import { ContentComponent } from "./content/content.component";
import { HeaderComponent } from "./header/header.component";
import { HeaderResponsivComponent } from "../header-responsiv/header-responsiv.component";
import { HeaderResponsivDialogComponent } from "../header-responsiv/header-responsiv-dialog/header-responsiv-dialog.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ContentComponent, HeaderComponent, HeaderResponsivComponent, HeaderResponsivDialogComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
