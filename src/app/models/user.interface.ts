import { Trip } from '../models/trip.interface';

export interface User { 
    name: string;
    userId: string;
    trips: [Trip]
}