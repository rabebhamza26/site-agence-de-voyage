import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AgencesService } from '../services/agences.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agence-form',
  standalone: true,
 imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule, HttpClientModule,RouterLink],
  templateUrl: './agence-form.component.html',
  styleUrl: './agence-form.component.css'
})
export class AgenceFormComponent implements OnInit {
 

  agence: any = {};
  agenceForm: FormGroup;
  isEditMode = false;
  agenceId: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private agenceService: AgencesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.agenceForm = this.fb.group({
      nomAgence: ['', Validators.required],
      adresse: ['', Validators.required],
      offre: ['', Validators.required],
      description: [''],
      prix: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.agenceId = params.get('id');
      this.isEditMode = !!this.agenceId;
      if (this.isEditMode && this.agenceId) {
        this.loadAgence();
      }
    });
  }

  loadAgence(): void {
    if (!this.agenceId) return;
    this.agenceService.getAgenceById(this.agenceId).subscribe({
      next: (agence) => {
        this.agence = agence;
        this.agenceId = agence.id ?? agence._id ?? this.agenceId;
        this.agenceForm.patchValue({
          nomAgence: agence.nomAgence || '',
          adresse: agence.adresse || '',
          offre: agence.offre || '',
          description: agence.description || '',
          prix: agence.prix ?? ''
        });
      },
      error: (err) =>
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de charger les données de l’agence.'
        })
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
    if (!this.agenceForm.valid) {
      this.agenceForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: 'Formulaire incomplet',
        text: 'Merci de remplir correctement tous les champs obligatoires.'
      });
      return;
    }

    Swal.fire({
      title: this.isEditMode ? 'Confirmer la modification ?' : 'Confirmer l’ajout ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: this.isEditMode ? 'Mettre à jour' : 'Ajouter',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveAgence();
      }
    });
  }

  saveAgence(): void {
    const formData = new FormData();
    const value = this.agenceForm.value;

    Object.keys(value).forEach(key => {
      if (value[key] !== null && value[key] !== undefined && value[key] !== '') {
        formData.append(key, value[key].toString());
      }
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.isEditMode && this.agenceId) {
      this.agenceService.updateAgence(this.agenceId, formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Agence mise à jour avec succès',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigate(['/agences']);
        },
        error: () =>
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible de mettre à jour l’agence. Réessayez plus tard.'
          })
      });
    } else {
      this.agenceService.createAgence(formData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Agence ajoutée avec succès',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigate(['/agences']);
        },
        error: () =>
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Impossible d’ajouter l’agence. Réessayez plus tard.'
          })
      });
    }
  }

  onCancel(): void {
    Swal.fire({
      title: 'Annuler les modifications ?',
      text: 'Vos changements ne seront pas enregistrés.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, quitter',
      cancelButtonText: 'Rester',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/agences']);
      }
    });
  }
}