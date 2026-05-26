import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { IUsers } from '../../shared/models/Users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient){}

  createUser(data : IUsers) : Observable<IUsers>
  {
    console.log('service data ',JSON.stringify(data));
    var apiUrl = this.baseUrl + '/User/CreateNewUser';
    return this.http.post<IUsers>(apiUrl, data);
  }
}
