
import { Routes } from '@angular/router';
import { firstGuard } from './core/guards/first.guard';

export const routes: Routes = [
    {
        path: 'hero-form',
        loadComponent: () => import('./hero-form/components/hero-form/hero-form.component').then(m => m.HeroFormComponent)
    },
    {
        path: 'reactive-hero-form',
        loadComponent: () => import('./hero-form/components/reactive-hero/reactive-hero.component').then(m => m.ReactiveHeroComponent)
    },
    {
        path: 'group-hero-form',
        loadComponent: () => import('./hero-form/components/group-hero/group-hero.component').then(m => m.GroupHeroComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./products/components/product-page/product-page.component').then(m => m.ProductPageComponent)
    },
     {
        path: 'products/:id',
        loadComponent: () => import('./products/components/product-details/product-details.component').then(m => m.ProductDetailsComponent)
    },
    {
        path: 'users',
        loadComponent: () => import('./randomUsers/pages/random-users-page/random-users-page.component').then(m => m.RandomUsersPageComponent),
        canActivate: [firstGuard]
    },
    {
        path: 'first-observable',
        loadComponent: () => import('./products/components/osservable-component/osservable-component.component').then(m => m.OsservableComponentComponent)
    },
    {
        path: 'second-observable',
        loadComponent: () => import('./products/components/second-osservable-component/second-osservable-component.component').then(m => m.SecondOsservableComponentComponent)
    },
    {
        path: 'welcome',
        loadComponent: () => import('./shared/welcome/welcome.component').then(m => m.WelcomeComponent)
    },
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./shared/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
