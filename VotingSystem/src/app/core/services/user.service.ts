import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api.config';
import { IUsers, ILoginRequest, ILoginResponse  } from '../../shared/models/Users';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private baseUrl = API_CONFIG.baseUrl;

  constructor(private http: HttpClient){}

  getToken() : string | null
  {
    return localStorage.getItem('token');
  }

  createUser(data : IUsers) : Observable<IUsers>
  {
    var apiUrl = this.baseUrl + '/User/CreateNewUser';
    return this.http.post<IUsers>(apiUrl, data);
  }
  
  loginUser(data : ILoginRequest) : Observable<ILoginResponse>
  {
    var apiUrl = this.baseUrl + '/User/LoginUser';
    return this.http.post<ILoginResponse>(apiUrl, data);
  }

}
