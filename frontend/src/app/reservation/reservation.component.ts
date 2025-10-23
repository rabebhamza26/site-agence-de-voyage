import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // ✅ Pour le [(ngModel)]
import { ReservationService } from '../services/reservation.service';
import Swal from 'sweetalert2';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule,RouterLink,RouterModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'] // ✅ correction: "styleUrls" (au pluriel)
})
export class ReservationComponent {

  reservation = { clientName: '', clientEmail: '', agencyName: '', date: '' };
  message = '';

  constructor(private reservationService: ReservationService) {}

  submitReservation() {
    if (!this.reservation.clientName || !this.reservation.clientEmail || !this.reservation.agencyName || !this.reservation.date) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        text: 'Veuillez remplir tous les champs avant de valider.',
      });
      return;
    }

    this.reservationService.createReservation(this.reservation).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Réservation envoyée !',
          text: 'Votre réservation a bien été enregistrée.',
          timer: 2000,
          showConfirmButton: false
        });
        this.message = 'Réservation envoyée !';
        this.reservation = { clientName: '', clientEmail: '', agencyName: '', date: '' }; // ✅ Réinitialise le formulaire
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de réservation',
          text: err.error?.message || 'Une erreur est survenue, réessayez plus tard.'
        });
        this.message = 'Erreur : ' + err.message;
      }
    });
  }
}
