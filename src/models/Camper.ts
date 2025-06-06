import {GalleryImage} from './GalleryImage';
import {Review} from './Review';
import {CamperFeatures} from "./CamperFeatures.ts";

export interface Camper {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: string;
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: string;
    engine: string;
    AC: boolean;
    bathroom: boolean;
    kitchen: boolean;
    TV: boolean;
    radio: boolean;
    refrigerator: boolean;
    microwave: boolean;
    gas: boolean;
    water: boolean;
    gallery: GalleryImage[];
    reviews: Review[];
    features?: CamperFeatures;
}
