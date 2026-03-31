import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { secondInterceptorInterceptor } from './core/interceptors/second-interceptor.interceptor';
import { firstInterceptorInterceptor } from './core/interceptors/first-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(
      withInterceptors([
        firstInterceptorInterceptor,
        secondInterceptorInterceptor
      ])
    ), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    FormsModule
  ]
};
