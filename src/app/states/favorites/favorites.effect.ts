import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import * as FavoritesActions from './favorites.actions';
import { FavoriteService } from '../../core/services/favorite.service';


@Injectable()
export class FavoritesEffects {
    private actions$ = inject(Actions);
    private favoriteService = inject(FavoriteService);

    addFavorite$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(FavoritesActions.addFavorite),
            switchMap(action =>
                this.favoriteService.findByUserAndJob(action.userId, action.job.id!).pipe(
                    switchMap(existing => {
                        if (existing.length > 0) {
                            console.warn('Favorite already exists for this user and job');
                            return of(FavoritesActions.addFavoriteFailure({ error: 'Already in favorites' }));
                        }
                        console.log(action.job.id + ' Added to favorites.');
                        return this.favoriteService.create(action.userId, action.job).pipe(
                            map(favorite => FavoritesActions.addFavoriteSuccess({ favorite })),
                            catchError(error => of(FavoritesActions.addFavoriteFailure({ error })))
                        );
                    }),
                    catchError(error => of(FavoritesActions.addFavoriteFailure({ error })))
                )
            )
        )
    );

    loadFavorites$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(FavoritesActions.loadFavorites),
            switchMap(() =>
                this.favoriteService.getAll().pipe(
                    map(favorites => FavoritesActions.loadFavoritesSuccess({ favorites })),
                    catchError(error => of(FavoritesActions.loadFavoritesFailure({ error })))
                )
            )
        )
    );

    removeFavorite$ = createEffect((): Observable<Action> =>
        this.actions$.pipe(
            ofType(FavoritesActions.removeFavorite),
            switchMap(action => this.favoriteService.delete(action.favorite).pipe(
                map(() => FavoritesActions.removeFavoriteSuccess({ favorite: action.favorite })),
                catchError(error => of(FavoritesActions.removeFavoriteFailure({ error })))
            ))
        )
    )

}

