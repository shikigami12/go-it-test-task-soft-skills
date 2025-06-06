export interface CamperFeatures {
    features: FeatureItem[],
    details: {
        form: string;
        length: string;
        width: string;
        height: string;
        tank: string;
        consumption: string;
    }
}

export interface FeatureItem {
    name: string;
    active: boolean;
    icon: string;
    value: string;
}