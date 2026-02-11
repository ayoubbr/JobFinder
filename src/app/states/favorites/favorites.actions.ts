import { createAction, props } from "@ngrx/store";
import { Job } from "../../core/models/job.model";

export const addFavorite = createAction(
    '[Favorites] Add Favorite',
    props<{ userId: number, job: Job }>()
);

export const addFavoriteSuccess = createAction(
    '[Favorites] Add Favroite Success',
    props<{ job: Job }>()
)

export const addFavoriteFailure = createAction(
    '[Favorites] Add Favorite Failure',
    props<{ error: any }>()
)

