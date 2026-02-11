import { createReducer, on } from "@ngrx/store";
import { initialState } from "./favorites.state";
import * as FavoritesActions from './favorites.actions';

export const favotitesReducer = createReducer(
    initialState,
    on(FavoritesActions.addFavorite, favoriteState => ({
        ...favoriteState, loading: true
    })),
    on(FavoritesActions.addFavoriteSuccess, (favoriteState, { job }) => ({
        ...favoriteState, loading: false, favorites: [...favoriteState.favorites, job]
    })),
    on(FavoritesActions.addFavoriteFailure, (favoriteState, { error }) => ({
        ...favoriteState, loading: false, error
    }))
);

