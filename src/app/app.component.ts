import { Component, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  config: PrimeNG = inject(PrimeNG);
  private translateService: TranslateService = inject(TranslateService);
  private http: HttpClient = inject(HttpClient);

  constructor() {
    const supportedLangs = ['fr', 'en'];
    this.translateService.addLangs(supportedLangs);
    this.translateService.setDefaultLang('fr');

    const browserLang = this.translateService.getBrowserLang() || 'fr';
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'fr';
    this.translateService.use(defaultLang);
    this.loadPrimeNgTranslations(defaultLang);
  }

  loadPrimeNgTranslations(lang: string) {
    this.http.get(`assets/i18n/primeng/${lang}.json`).subscribe(res => this.config.setTranslation(res));
  }
}
