import { Component } from '@angular/core';
import { TranslateService } from '../../../service/translate.service';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-my-tools',
  standalone: true,
  imports: [],
  templateUrl: './my-tools.component.html',
  styleUrl: './my-tools.component.scss'
})
export class MyToolsComponent {
constructor(
  public translateService:TranslateService,
  public layoutService:LayoutService,

){

}
}
