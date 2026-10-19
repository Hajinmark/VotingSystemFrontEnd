import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PositionDataResponse } from '../../shared/models/IPosition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  
  private baseUrl = API_CONFIG.baseUrl;
  constructor(private http : HttpClient) {
    
  }

  GetPositionDataService(electionName ? : string | null, positionName ? : string | null) : Observable<PositionDataResponse[]>
  {
    let params = new HttpParams();

    if(electionName)
      params = params.set('ElectionName', electionName);

    if(positionName)
      params = params.set('PositionName', positionName);

    var apiUrl = this.baseUrl + '/Position/RetrievePositions';
    return this.http.get<PositionDataResponse[]>(apiUrl, {params});
  }



}
