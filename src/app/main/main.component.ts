import { Component } from '@angular/core';
import { ContentComponent } from "./content/content.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ContentComponent, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
