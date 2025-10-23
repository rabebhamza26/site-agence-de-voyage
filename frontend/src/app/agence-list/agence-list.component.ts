import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { AgencesService } from '../services/agences.service';


@Component({
  selector: 'app-agence-list',
  standalone: true,
 imports: [HttpClientModule, FormsModule, ReactiveFormsModule, CommonModule, RouterModule,RouterLink],
  templateUrl: './agence-list.component.html',
  styleUrl: './agence-list.component.css'
})
export class AgenceListComponent implements OnInit {
  agences: any[] = [];

  constructor(private agenceService: AgencesService, private router: Router) {}

  ngOnInit(): void {
    this.loadAgences();
  }

  loadAgences(): void {
    this.agenceService.getListAgences().subscribe({
      next: (data) => {
        console.log('agences reçues:', data);
        this.agences = data;
      },
      error: (err) => {
        console.error('Erreur:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur de chargement',
          text: 'Impossible de récupérer la liste des agences',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

  onEditClick(agence: any): void {
    // juste pour debug ; navigation est faite par routerLink
    Swal.fire({
      title: 'Édition',
      text: `Vous êtes sur le point de modifier l’agence : ${agence.nomAgence}`,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  }

  deleteAgence(id: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.agenceService.deleteAgence(id).subscribe({
          next: () => {
            this.agences = this.agences.filter(a => a.id !== id && a._id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Supprimée avec succès',
              showConfirmButton: false,
              timer: 2000
            });
          },
          error: (err) => {
            console.error('Erreur:', err);
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors de la suppression',
              text: 'Veuillez réessayer plus tard.',
              confirmButtonText: 'Fermer'
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Annulé',
          text: 'La suppression a été annulée 👍',
          icon: 'info',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}