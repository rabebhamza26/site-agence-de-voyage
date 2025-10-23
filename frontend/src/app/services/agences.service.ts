import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencesService {
 private baseUrl = 'http://localhost:3000/api/agences';

  constructor(private http: HttpClient) {}

  getListAgences(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getAgenceById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createAgence(data: FormData): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateAgence(id: string, data: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteAgence(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}