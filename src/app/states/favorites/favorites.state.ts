import { Favorite } from "../../core/models/favorite.model";

export interface FavoritesState {
    favorites: Favorite[],
    loading: boolean,
    error: any
}

export const initialState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null
}