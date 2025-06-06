import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import apiClient from '../clients/ApiClient';
import {Camper} from '../models/Camper';

interface CampersState {
    items: Camper[];
    currentCamper: Camper | null;
    isLoading: boolean;
    error: string | null;
    filters: {
        location: string;
        form: string;
        features: string[];
    };
    page: number;
}

const initialState: CampersState = {
    items: [],
    currentCamper: null,
    isLoading: false,
    error: null,
    filters: {
        location: '',
        form: '',
        features: [],
    },
    page: 1,
};

export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async (_, {getState, rejectWithValue}) => {
        try {
            const {campers} = getState() as { campers: CampersState };
            const {location, form, features} = campers.filters;

            const params: Record<string, string | boolean> = {};

            params.page = campers.page.toString();

            if (location) {
                params.location = location;
            }

            if (form) {
                params.form = form;
            }

            if (features.length > 0) {
                features.forEach(feature => {
                    params[feature] = true;
                });
            }

            const response = await apiClient.getCampers(params);
            return response.items;
        } catch (error) {
            console.error('Error fetching campers:', error);
            return rejectWithValue('Failed to fetch campers');
        }
    }
);

export const fetchCamperById = createAsyncThunk(
    'campers/fetchCamperById',
    async (id: string, {rejectWithValue}) => {
        try {
            const response = await apiClient.getCamperById(id);
            return response;
        } catch (error) {
            console.error('Error fetching camper by ID:', error);
            return rejectWithValue('Failed to fetch camper details');
        }
    }
);

const campersSlice = createSlice({
    name: 'campers',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setLocationFilter: (state, action: PayloadAction<string>) => {
            state.filters.location = action.payload;
        },
        setFormFilter: (state, action: PayloadAction<string>) => {
            state.filters.form = action.payload;
        },
        toggleFeatureFilter: (state, action: PayloadAction<string>) => {
            const feature = action.payload;
            const index = state.filters.features.indexOf(feature);

            if (index !== -1) {
                state.filters.features.splice(index, 1);
            } else {
                state.filters.features.push(feature);
            }
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        resetCampers: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCamperById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCamperById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentCamper = action.payload;
            })
            .addCase(fetchCamperById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setLocationFilter,
    setFormFilter,
    toggleFeatureFilter,
    setPage,
    resetCampers,
    clearFilters
} = campersSlice.actions;

export default campersSlice.reducer;
