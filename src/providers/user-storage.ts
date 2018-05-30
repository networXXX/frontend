import { ModelDate } from './modelDate';
import { HaversineService, GeoCoord } from "ng2-haversine";


export interface UserStorage {
    displayName: string;
    type?: string;
    imageUrl?: string;
    id?: string;
    email: string;
    status?: string;
    pos?: GeoCoord;
    curPos?: GeoCoord;
    token?: string;
    auth?: string;
}
