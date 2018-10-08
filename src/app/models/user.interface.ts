import { Trip } from '../models/trip.interface';

export interface User { 
    name: string;
    userId: string;
    trips: [string];
    freinds: [string];
    bookmarkes: [string]
}