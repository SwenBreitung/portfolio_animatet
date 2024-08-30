import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ImpressumComponent } from './impressum/impressum.component'
import { PolicyComponent } from './policy/policy.component'

export const routes: Routes = [
    { path: 'main', component: MainComponent},
    { path: '', component: MainComponent},
    { path: 'impressum', component: ImpressumComponent},
    { path: 'policy', component: PolicyComponent},
];

