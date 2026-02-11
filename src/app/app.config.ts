import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { favotitesReducer } from './states/favorites/favorites.reducer';
import { FavoritesEffects } from './states/favorites/favorites.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ favorites: favotitesReducer }),
    provideEffects([FavoritesEffects]),
    // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
