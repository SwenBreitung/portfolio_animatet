import { Component } from '@angular/core';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { DisplacementSphereComponent } from "../../animationen/displacement-sphere/displacement-sphere.component";
import { MyProjectsComponent } from "./my-projects/my-projects.component";
import { MySkillsComponent } from "./my-skills/my-skills.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutMeComponent } from "./about-me/about-me.component";
import { MyToolsComponent } from "./my-tools/my-tools.component";
import { ThreeJsAnimationComponent } from "../../animationen/three-js-animation/three-js-animation.component";
import { HeaderResponsivComponent } from "../../header-responsiv/header-responsiv.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [HeroSectionComponent, DisplacementSphereComponent, MyProjectsComponent, MySkillsComponent, ContactComponent, AboutMeComponent, MyToolsComponent, ThreeJsAnimationComponent, HeaderResponsivComponent, FooterComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
