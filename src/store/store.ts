import {configureStore} from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
    reducer: {
        campers: campersReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
