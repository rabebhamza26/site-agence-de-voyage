import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { 
 loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs manquants',
        text: 'Veuillez remplir tous les champs',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    this.http.post<any>('http://localhost:3000/api/login', this.loginForm.value)
      .subscribe({
        next: (res) => {
          // Enregistrement du token dans le localStorage
          localStorage.setItem('token', res.token);

          Swal.fire({
            icon: 'success',
            title: 'Connexion réussie ✅',
            text: `Bienvenue ${this.loginForm.value.username}`,
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            // Redirection selon le rôle
            if (this.loginForm.value.username.toLowerCase() === 'admin') {
              this.router.navigate(['/dashboardAdmin']);
            } else {
              this.router.navigate(['/home']);
            }
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion ❌',
            text: err.error?.message || 'Identifiants incorrects',
            confirmButtonColor: '#d33'
          });
        }
      });
  }
}