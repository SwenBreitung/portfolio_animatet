import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-right',
  standalone: true,
  imports: [],
  templateUrl: './button-right.component.html',
  styleUrl: './button-right.component.scss'
})
export class ButtonRightComponent {

  @Input() buttonText: string = 'Default Text';
  @Input() actionMethod: () => void = () => { console.log('No action assigned!'); };
  @Input() isDisabled: boolean = false;

  handleClick() {
    this.actionMethod();
  }
}
