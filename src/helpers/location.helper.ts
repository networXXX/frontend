import { UpdateLocationRequest } from './../providers/model/updateLocationRequest';
import {Injectable} from '@angular/core';
import { HaversineService, GeoCoord } from "ng2-haversine";
import { DefaultService } from '../providers/api/default.service';

import * as models  from '../providers/model/models';
import { Utils } from '../utils/utils';

import {AppConstants} from '../constants/app.constants'

@Injectable()
export class LocationHelper {

    constructor(private storage: Storage, private api: DefaultService, private _haversineService: HaversineService) {

    }

    /**
     * Checks if distance between old and new is greater than 200
     * @param oldPos 
     * @param curPos 
     * @returns boolean
     */
    hasNewPos(oldPos: GeoCoord, curPos: GeoCoord): Boolean {
        let meters = this._haversineService.getDistanceInMeters(oldPos, curPos);
        if (meters > AppConstants.MAX_METER) {
            return true;
        } 
        return false;
    }

   

}
