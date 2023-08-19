import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:4000';
  
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`; // Replace with your login endpoint URL
    
    // Make a login POST request and return the response
    return this.http.post(url, { username, password });
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem('token');
  }

  getTodosWithBasicAuth(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/todos`;
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get(url, { headers });
  }

  get isUserLogged(): boolean {
    return !!localStorage.getItem('token'); // Check if the token exists in local storage
  }
}
