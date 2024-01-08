import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';

/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'radio-ng-model-example',
  templateUrl: 'radio-ng-model-example.component.html',
  styleUrls: ['radio-ng-model-example.component.sass'],
  standalone: true,
  imports: [MatRadioModule, FormsModule],
})
export class RadioNgModelExample {
  susPlayer: string | undefined;
  players: string[] = ['Alice', 'Bob', 'Summer', 'John'];
}
