export interface Trip {
    userId: string;
    name: string;
    description: string;
    country: string;
    city: string;
    coordinates: {
        latitude: number; 
        longitude: number; 
    }
    photos: [string];
    
}