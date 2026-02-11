import { createReducer, on } from "@ngrx/store";
import { initialState } from "./favorites.state";
import * as FavoritesActions from './favorites.actions';

export const favotitesReducer = createReducer(
    initialState,
    on(FavoritesActions.addFavorite, favoriteState => ({
        ...favoriteState, loading: true
    })),
    on(FavoritesActions.addFavoriteSuccess, (favoriteState, { favorite }) => ({
        ...favoriteState, loading: false, favorites: [...favoriteState.favorites, favorite]
    })),
    on(FavoritesActions.addFavoriteFailure, (favoriteState, { error }) => ({
        ...favoriteState, loading: false, error
    })),
    on(FavoritesActions.loadFavorites, favoriteState => ({
        ...favoriteState, loading: true
    })),
    on(FavoritesActions.loadFavoritesSuccess, (favoriteState, { favorites }) => ({
        ...favoriteState, loading: false, favorites
    })),
    on(FavoritesActions.loadFavoritesFailure, (favoriteState, { error }) => ({
        ...favoriteState, loading: false, error
    })),
    on(FavoritesActions.removeFavorite, favoriteState => ({
        ...favoriteState, loading: true
    })),
    on(FavoritesActions.removeFavoriteSuccess, (favoriteState, { favorite }) => ({
        ...favoriteState, loading: false, favorites: favoriteState.favorites.filter(f => f.id !== favorite.id)
    })),
    on(FavoritesActions.removeFavoriteFailure, (favoriteState, { error }) => ({
        ...favoriteState, loading: false, error
    })),
);

