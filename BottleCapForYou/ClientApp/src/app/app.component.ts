import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AnalyticsService } from './core/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Analytics is temporarily disabled for deployment.
  // Re-enable by restoring the AnalyticsService import and constructor.
  // constructor(private readonly analytics: AnalyticsService) {
  //   this.analytics.start();
  // }
}
