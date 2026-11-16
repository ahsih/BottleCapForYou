import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactBarComponent } from './core/contact-bar.component';
import { ConversionTrackingService } from './core/conversion-tracking.service';
import { LanguageBannerComponent } from './core/language-banner.component';
// import { AnalyticsService } from './core/analytics.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageBannerComponent, ContactBarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Analytics is temporarily disabled for deployment.
  // Re-enable by restoring the AnalyticsService import and constructor.
  // constructor(private readonly analytics: AnalyticsService) {
  //   this.analytics.start();
  // }

  /**
   * Conversion reporting is deliberately NOT part of the disabled analytics
   * above: it needs no backend, and it is the only signal Google Ads can bid
   * on. Starting it here covers contact links on every page at once.
   */
  private readonly conversions = inject(ConversionTrackingService);

  constructor() {
    this.conversions.start();
  }
}
