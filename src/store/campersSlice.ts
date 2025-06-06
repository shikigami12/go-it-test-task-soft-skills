import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import apiClient from '../clients/ApiClient';
import {Camper} from '../models/Camper';
import {CamperFeatures, FeatureItem} from "../models/CamperFeatures.ts";

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
    perPage: number;
    totalCount: number;
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
    perPage: 6,
    totalCount: 0
};

const mapCamperToCamperWithFeatures = (camper: Camper): Camper => {
    const features = {} as CamperFeatures;
    features.features = [];
    for (const key in camper) {
        if (Object.prototype.hasOwnProperty.call(camper, key) && Boolean(camper[key as keyof Camper])) {
            switch (key) {
                case 'AC':
                    features.features.push({
                        name: 'AC',
                        icon: 'ac',
                        value: 'AC'
                    } as FeatureItem);
                    break;
                case 'bathroom':
                    features.features.push({
                        name: 'Bathroom',
                        icon: 'bathroom',
                        value: 'bathroom'
                    } as FeatureItem);
                    break;
                case 'kitchen':
                    features.features.push({
                        name: 'Kitchen',
                        icon: 'kitchen',
                        value: 'kitchen'
                    } as FeatureItem);
                    break;
                case 'TV':
                    features.features.push({
                        name: 'TV',
                        icon: 'tv',
                        value: 'TV'
                    } as FeatureItem);
                    break;
                case 'radio':
                    features.features.push({
                        name: 'Radio',
                        icon: 'radio',
                        value: 'radio'
                    } as FeatureItem);
                    break;
                case 'refrigerator':
                    features.features.push({
                        name: 'Refrigerator',
                        icon: 'refrigerator',
                        value: 'refrigerator'
                    } as FeatureItem);
                    break;
                case 'microwave':
                    features.features.push({
                        name: 'Microwave',
                        icon: 'microwave',
                        value: 'microwave'
                    } as FeatureItem);
                    break;
                case 'gas':
                    features.features.push({
                        name: 'Petrol',
                        icon: 'gas',
                        value: 'gas'
                    } as FeatureItem);
                    break;
                case 'water':
                    features.features.push({
                        name: 'Water',
                        icon: 'water',
                        value: 'water'
                    } as FeatureItem);
                    break;
                default:
                    // Skip other properties that are not features
                    break;
            }
        }
    }

    features.details = {
        form: camper.form,
        length: camper.length,
        width: camper.width,
        height: camper.height,
        tank: camper.tank,
        consumption: camper.consumption
    };

    camper.features = features;
    return camper;
};

export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async (_, {getState, rejectWithValue}) => {
        try {
            const {campers} = getState() as { campers: CampersState };
            const {location, form, features} = campers.filters;

            const params: Record<string, string | boolean> = {};

            params.page = campers.page.toString();
            params.limit = campers.perPage.toString();

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
            return {total: response.total, campers: response.items.map(camper => mapCamperToCamperWithFeatures(camper))};
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
            const result = await apiClient.getCamperById(id);
            return mapCamperToCamperWithFeatures(result);
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
            const form = action.payload;
            state.filters.form = state.filters.form === form ? '' : form;
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
                // Merge new items with existing ones, avoiding duplicates
                const newItems = action.payload.campers;
                const existingIds = new Set(state.items.map(item => item.id));
                const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
                state.items = [...state.items, ...uniqueNewItems];
                state.totalCount = action.payload.total;
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
