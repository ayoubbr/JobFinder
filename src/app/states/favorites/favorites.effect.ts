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
                this.favoriteService.create(action.userId, action.job.id!).pipe(
                    map(() =>
                        FavoritesActions.addFavoriteSuccess({ job: action.job })
                    ),
                    catchError(error =>
                        of(FavoritesActions.addFavoriteFailure({ error }))
                    )
                )
            )
        )
    );

}

