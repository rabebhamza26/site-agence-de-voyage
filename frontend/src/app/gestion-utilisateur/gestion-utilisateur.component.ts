import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../services/utilisateur.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion-utilisateur',
  standalone: true,
imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,RouterLink],
  templateUrl: './gestion-utilisateur.component.html',
  styleUrl: './gestion-utilisateur.component.css'
})
export class GestionUtilisateurComponent implements OnInit {
  users: any[] = [];
  userForm: any = { nom: '', prenom: '', email: '', telephone: '', username: '', password: '' };
  isEdit: boolean = false;
  editId: string | null = null;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.utilisateurService.getUsers().subscribe(
      (data: any[]) => this.users = data,
      (error) => console.error("Erreur lors du chargement des utilisateurs :", error)
    );
  }

  saveUser() {
    if (this.isEdit && this.editId) {
      this.utilisateurService.updateUser(this.editId, this.userForm).subscribe(
        () => {
          Swal.fire('Succès', 'Utilisateur mis à jour avec succès', 'success');
          this.loadUsers();
          this.resetForm();
        },
        () => Swal.fire('Erreur', 'Impossible de mettre à jour l’utilisateur', 'error')
      );
    } else {
      this.utilisateurService.addUser(this.userForm).subscribe(
        () => {
          Swal.fire('Succès', 'Utilisateur ajouté avec succès', 'success');
          this.loadUsers();
          this.resetForm();
        },
        () => Swal.fire('Erreur', 'Impossible d’ajouter l’utilisateur', 'error')
      );
    }
  }

  editUser(user: any) {
    this.userForm = { ...user };
    this.isEdit = true;
    this.editId = user.id || user._id;
  }

  deleteUser(user: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cette action est irréversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.utilisateurService.deleteUser(user.id || user._id).subscribe(
          () => {
            Swal.fire('Supprimé !', 'L’utilisateur a été supprimé.', 'success');
            this.loadUsers();
          },
          () => Swal.fire('Erreur', 'Impossible de supprimer l’utilisateur', 'error')
        );
      }
    });
  }

  resetForm() {
    this.userForm = { nom: '', prenom: '', email: '', telephone: '', username: '', password: '' };
    this.isEdit = false;
    this.editId = null;
  }
}