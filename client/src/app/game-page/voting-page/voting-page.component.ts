import { Component } from '@angular/core';
import { RadioNgModelExample } from './radio-ng-model-example/radio-ng-model-example.component';
import { ProgressSpinnerConfigurableExample } from './progress-spinner-configurable-example/progress-spinner-configurable-example.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voting-page',
  standalone: true,
  imports: [
    RadioNgModelExample,
    ProgressSpinnerConfigurableExample,
    MatCardModule,
  ],
  templateUrl: './voting-page.component.html',
  styleUrl: './voting-page.component.sass'
})
export class VotingPageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // TIMER 

    setTimeout(() => {
      this.router.navigate(['./reveal'], { relativeTo: this.route.parent });
    }, 60000); // 60s Voting Phase of Game
  }
}
