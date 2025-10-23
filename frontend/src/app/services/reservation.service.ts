import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
 private apiUrl = 'http://localhost:3000/api/reservations';

  constructor(private http: HttpClient) {}

  /** Ajouter une réservation */
  createReservation(reservation: any): Observable<any> {
    return this.http.post(this.apiUrl, reservation);
  }

  /** Récupérer toutes les réservations */
  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** Modifier une réservation */
  updateReservation(id: string, reservation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reservation);
  }

  /** Supprimer une réservation */
  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /** Confirmer une réservation */
  confirmReservation(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/confirm`, {});
  }

  /** Annuler une réservation */
  cancelReservation(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, {});
  }
}