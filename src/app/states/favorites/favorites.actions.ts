import { createAction, props } from "@ngrx/store";
import { Job } from "../../core/models/job.model";
import { Favorite } from "../../core/models/favorite.model";

export const addFavorite = createAction(
    '[Favorites] Add Favorite',
    props<{ userId: number, job: Job }>()
);

export const addFavoriteSuccess = createAction(
    '[Favorites] Add Favroite Success',
    props<{ job: Favorite }>()
)

export const addFavoriteFailure = createAction(
    '[Favorites] Add Favorite Failure',
    props<{ error: any }>()
)


export const loadFavorites = createAction(
    '[Favorites] Load Favorites'
);

export const loadFavoritesSuccess = createAction(
    '[Favorites] Load Favorites Success',
    props<{ favorites: Favorite[] }>()
);

export const loadFavoritesFailure = createAction(
    '[Favorites] Load Favorites Failure',
    props<{ error: any }>()
);

