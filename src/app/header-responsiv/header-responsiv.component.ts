import { Component } from '@angular/core';
import { LayoutService } from './../service/layout.service'
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-header-responsiv',
  standalone: true,
  imports: [],
  templateUrl: './header-responsiv.component.html',
  styleUrl: './header-responsiv.component.scss'
})
export class HeaderResponsivComponent {
  constructor(
    public layoutService:LayoutService,
    private cdRef: ChangeDetectorRef
  ){}
  openDialog(){
    console.log('click')
    this.layoutService.isDialogOpen = true;
    this.cdRef.detectChanges(); 
    console.log( this.layoutService.isDialogOpen)
  }

}
