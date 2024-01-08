import { Component } from '@angular/core';
import { RadioNgModelExample } from './radio-ng-model-example/radio-ng-model-example.component';
import { ProgressSpinnerConfigurableExample } from './progress-spinner-configurable-example/progress-spinner-configurable-example.component';

@Component({
  selector: 'app-voting-page',
  standalone: true,
  imports: [
    RadioNgModelExample,
    ProgressSpinnerConfigurableExample
  ],
  templateUrl: './voting-page.component.html',
  styleUrl: './voting-page.component.sass'
})
export class VotingPageComponent {

}
