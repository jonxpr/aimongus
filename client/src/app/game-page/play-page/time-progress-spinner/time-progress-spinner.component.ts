import {Component, Input} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'time-progress-spinner',
  templateUrl: 'time-progress-spinner.component.html',
  standalone: true,
  imports: [MatCardModule, MatRadioModule, FormsModule, MatSliderModule, MatProgressSpinnerModule],
})
export class TimeProgressSpinner {
  @Input() timerValue: any;
  @Input() timerValueProportion: any;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
}
