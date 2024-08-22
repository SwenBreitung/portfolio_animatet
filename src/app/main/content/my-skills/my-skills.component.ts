import { Component, } from '@angular/core';
import { TranslateService } from '../../../service/translate.service';
import { LayoutService } from '../../../service/layout.service';
import { ChevronIconComponent } from "../../../ui-components/chevron-icon/chevron-icon.component";

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [ChevronIconComponent],
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss'
})
export class MySkillsComponent  {
  constructor(
    public translateService:TranslateService,
    public layoutService:LayoutService,
  ){}
  testing(){
    console.log('test')
  }

  
}