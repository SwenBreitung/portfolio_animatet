import { Component, } from '@angular/core';
import { TranslateService } from '../../../service/translate.service';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent  {
  constructor(
    public translateService:TranslateService,
    public layoutService:LayoutService,
  ){}



  
}