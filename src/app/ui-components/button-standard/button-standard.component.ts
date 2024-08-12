import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-standard',
  standalone: true,
  imports: [],
  templateUrl: './button-standard.component.html',
  styleUrl: './button-standard.component.scss'
})
export class ButtonStandardComponent {

  @Input() buttonText: string = 'Default Text';
  @Input() actionMethod: () => void = () => { console.log('No action assigned!'); };
  @Input() isDisabled: boolean = false; // Neu hinzugefügt

  handleClick() {
    this.actionMethod();
  }
}
