import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { APP_LANGUAGES, LANGUAGE_PREFIX, PAGE_PATH, PageKey, isLocalized } from './core/locale';
import { AppLanguage } from './i18n/translations';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail.component';

// The per-product route is added separately in routesForLanguage() because it
// carries a :slug parameter rather than a fixed path.
const PAGES: { page: PageKey; component: Type<unknown> }[] = [
  { page: 'home', component: HomeComponent },
  { page: 'news', component: NewsComponent },
  { page: 'products', component: ProductsComponent },
  { page: 'thank-you', component: HomeComponent }
];

/**
 * Builds the four page routes for one language. The language is carried on the
 * route's `data` so that it is decided by the URL alone - this is what lets
 * each language be prerendered, crawled and indexed separately.
 */
function routesForLanguage(language: AppLanguage): Routes {
  const prefix = LANGUAGE_PREFIX[language].replace(/^\//, '');

  // Only English carries the pages that have no translation yet.
  const pages = language === 'en' ? PAGES : PAGES.filter(({ page }) => isLocalized(page));

  const routes: Routes = pages.map(({ page, component }) => {
    const segment = PAGE_PATH[page].replace(/^\//, '');
    const path = [prefix, segment].filter(Boolean).join('/');

    return {
      path,
      component,
      data: { language, page },
      ...(path === '' ? { pathMatch: 'full' as const } : {})
    };
  });

  // One page per product, e.g. /products/3025-bottle-cap, /zh/products/...
  routes.push({
    path: [prefix, 'products', ':slug'].filter(Boolean).join('/'),
    component: ProductDetailComponent,
    data: { language, page: 'product' as PageKey }
  });

  return routes;
}

export const routes: Routes = [
  ...APP_LANGUAGES.flatMap((language) => routesForLanguage(language)),
  {
    path: '**',
    redirectTo: ''
  }
];
