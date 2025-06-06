import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Camper} from './campersSlice';

interface FavoritesState {
    items: Camper[];
}

// Load favorites from localStorage if available
const loadFavoritesFromStorage = (): Camper[] => {
    try {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        return [];
    }
};

const initialState: FavoritesState = {
    items: loadFavoritesFromStorage(),
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<Camper>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push(newItem);
                // Save to localStorage
                localStorage.setItem('favorites', JSON.stringify(state.items));
            }
        },
        removeFromFavorites: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            // Save to localStorage
            localStorage.setItem('favorites', JSON.stringify(state.items));
        },
    },
});

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;
