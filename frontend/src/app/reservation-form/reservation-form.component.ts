import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../services/reservation.service';
import Swal from 'sweetalert2';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink,RouterModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
reservationForm: FormGroup;
  message = '';
  reservations: any[] = [];
  editingReservationId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      nomClient: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nomAgence: ['', Validators.required],
      numeroTelephone: ['', Validators.required],
      dateDebutReservation: ['', Validators.required],
      dateFinReservation: ['', Validators.required],
      heureDebutReservation: ['', Validators.required],
      heureFinReservation: ['', Validators.required],
      statut: ['En attente']
    });
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  /** Charger toutes les réservations depuis le backend */
  loadReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data: any[]) => (this.reservations = data),
      error: (err: any) => console.error('Erreur chargement réservations', err)
    });
  }

  /** Soumettre le formulaire (ajout ou modification) */
  submit(): void {
    if (this.reservationForm.invalid) {
      this.message = 'Veuillez remplir tous les champs requis ❗';
      return;
    }

    const reservation = this.reservationForm.value;

    if (this.editingReservationId) {
      // Modification
      this.reservationService.updateReservation(this.editingReservationId, reservation).subscribe({
        next: () => {
          Swal.fire('Succès ✅', 'Réservation mise à jour avec succès', 'success');
          this.editingReservationId = null;
          this.reservationForm.reset();
          this.loadReservations();
        },
        error: err => Swal.fire('Erreur ❌', err.error?.message || 'Impossible de mettre à jour', 'error')
      });
    } else {
      // Création
      this.reservationService.createReservation(reservation).subscribe({
        next: () => {
          Swal.fire('Succès ✅', 'Réservation créée avec succès', 'success');
          this.reservationForm.reset();
          this.loadReservations();
        },
        error: err => Swal.fire('Erreur ❌', err.error?.message || 'Impossible de créer la réservation', 'error')
      });
    }
  }

  /** Préremplir le formulaire pour modification */
  edit(res: any): void {
    this.editingReservationId = res._id;
    this.reservationForm.patchValue(res);
  }

  /** Supprimer une réservation */
  delete(id: string): void {
    Swal.fire({
      title: 'Confirmer la suppression ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(id).subscribe({
          next: () => {
            Swal.fire('Supprimée 🗑️', 'Réservation supprimée avec succès', 'success');
            this.loadReservations();
          },
          error: err => Swal.fire('Erreur ❌', err.error?.message || 'Impossible de supprimer', 'error')
        });
      }
    });
  }

  /** Confirmer une réservation */
  confirm(res: any): void {
    this.reservationService.confirmReservation(res._id).subscribe({
      next: () => {
        Swal.fire('Confirmée ✅', 'Réservation confirmée', 'success');
        this.loadReservations();
      },
      error: err => Swal.fire('Erreur ❌', err.error?.message || 'Impossible de confirmer', 'error')
    });
  }

  /** Annuler une réservation */
  cancel(res: any): void {
    this.reservationService.cancelReservation(res._id).subscribe({
      next: () => {
        Swal.fire('Annulée 🚫', 'Réservation annulée', 'info');
        this.loadReservations();
      },
      error: err => Swal.fire('Erreur ❌', err.error?.message || 'Impossible d’annuler', 'error')
    });
  }
}