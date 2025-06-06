import axios, {AxiosInstance} from 'axios';
import {Camper} from '../models/Camper';
import {CampersResponse} from '../models/CampersResponse';

class ApiClient {
    private static instance: ApiClient;
    private client: AxiosInstance;

    private constructor() {
        const baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }

        return ApiClient.instance;
    }

    public async getCampers(params: Record<string, string | boolean> = {}): Promise<CampersResponse> {
        const response = await this.client.get('/campers', {params});
        return response.data;
    }

    public async getCamperById(id: string): Promise<Camper> {
        const response = await this.client.get(`/campers/${id}`);
        return response.data;
    }
}

export default ApiClient.getInstance() as ApiClient;
