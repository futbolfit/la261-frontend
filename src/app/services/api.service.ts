import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  get token() {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('AUTH_TOKEN_SNGO');
    }
    return null; // O un valor predeterminado si es necesario
  }

  get(petitionUrl: string, requiresAuth: boolean = true): Observable<any> {
    const token = this.token!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}${petitionUrl}`;
    const reqHeaders = requiresAuth ? { headers } : {};
    return this.http.get<any>(`${url}`, reqHeaders);
  }

  post(
    petitionUrl: string,
    body: Record<string, any>,
    requiresAuth: boolean = true
  ): Observable<any> {
    const token = this.token!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.baseUrl}${petitionUrl}`;
    const reqHeaders = requiresAuth ? { headers } : {};
    return this.http.post<any>(`${url}`, body, reqHeaders);
  }

}
