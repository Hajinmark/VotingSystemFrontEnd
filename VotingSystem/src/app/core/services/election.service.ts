import { Injectable, OnInit } from '@angular/core';
import { API_CONFIG } from '../api.config';
import { HttpClient } from '@angular/common/http';
import { ElectionData, ICreateElection, IElectionStatus } from '../../shared/models/Elections';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ElectionService{
  
  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient) {
  }

  getElectectionStatus() : Observable<IElectionStatus[]>
  {
    var apiUrl = this.baseUrl + '/Election/GetElectionStatus';
    return this.http.get<IElectionStatus[]>(apiUrl);
  }

  createElection(data : ICreateElection) : Observable<ICreateElection>
  {
    var apiUrl = this.baseUrl + '/Election/CreateElection';
    return this.http.post<ICreateElection>(apiUrl, data);
  }

  getElectionData() : Observable<ElectionData[]>
  {
    var apiUrl = this.baseUrl + '/Election/GetElections';
    return this.http.get<ElectionData[]>(apiUrl);
  }
}
