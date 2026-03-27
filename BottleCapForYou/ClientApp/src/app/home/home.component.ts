import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { AppLanguage } from '../i18n/translations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly partners = ['SK chemicals', 'EASTMAN', 'CHINA RESOURCES', 'LOTTE', 'SABIC', 'BASF'];
  readonly links = ['PETG', 'PCTG', 'PEEK', 'PPSU'];
  readonly contact = {
    phones: ['+86 188 9267 2536', '+86 0574 6253 2768'],
    fax: '0574-62532768',
    email: 'admin@dyplas.com'
  };

  protected readonly i18n = inject(I18nService);
  protected readonly language = this.i18n.language;
  protected readonly content = this.i18n.content;

  setLanguage(language: AppLanguage): void {
    this.i18n.setLanguage(language);
  }
}
