import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { NewsComponent } from './app/news/news.component';
import { ProductsComponent } from './app/products/products.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'thank-you',
        component: HomeComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ])
  ]
}).catch((err) => console.error(err));
