export interface Trip {
    userId: string;
    title: string;
    story: string;
    country: string;
    city: string;
    coordinates: {
        latitude: number; 
        longitude: number; 
    }
    photos: string[];
    creationDate: Date;
    updateDate: Date;
    likes: string[];
}