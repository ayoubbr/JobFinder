import { Job } from "../../core/models/job.model";

export interface FavoritesState {
    favorites: Job[],
    loading: boolean,
    error: any
}

export const initialState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null
}