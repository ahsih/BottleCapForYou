import { RenderMode, ServerRoute } from '@angular/ssr';
import { APP_LANGUAGES, LANGUAGE_PREFIX } from './core/locale';
import { PRODUCTS } from './products/products.data';

/**
 * Parameterised routes cannot be discovered by walking the router config, so
 * the build is told which product slugs to prerender. The list comes from the
 * same PRODUCTS array the pages render from, so a new product automatically
 * gets a prerendered page in every language.
 */
const productSlugs = async () => PRODUCTS.map((product) => ({ slug: product.slug }));

export const serverRoutes: ServerRoute[] = [
  ...APP_LANGUAGES.map((language) => {
    const prefix = LANGUAGE_PREFIX[language].replace(/^\//, '');

    return {
      path: [prefix, 'products', ':slug'].filter(Boolean).join('/'),
      renderMode: RenderMode.Prerender,
      getPrerenderParams: productSlugs
    } satisfies ServerRoute;
  }),
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
