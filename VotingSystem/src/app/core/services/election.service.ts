import { Injectable, OnInit } from '@angular/core';
import { API_CONFIG } from '../api.config';
import { HttpClient } from '@angular/common/http';
import { Election, ElectionData, FilterElectionResponse, ICreateElection, IElectionStatus, UpdateElectionRequest } from '../../shared/models/Elections';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ElectionService{
  
  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient) {
  }

  deleteElection(electionId : number) : Observable<string>
  {
    var apiUrl = this.baseUrl + '/Election/DeleteElection?Id=';
    return this.http.delete<string>(apiUrl + electionId);
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

  updateElection(request: UpdateElectionRequest) : Observable<Election>
  {
    var apiUrl = this.baseUrl + '/Election/UpdateElection';
    return this.http.put<Election>(apiUrl, request);
  }

  filterElectionByName(electionName : string) : Observable<FilterElectionResponse[]>
  {
    var apiUrl = this.baseUrl + '/Election/FilterElectionByName?electionName='
    return this.http.get<FilterElectionResponse[]>(apiUrl + electionName);
  }
}
