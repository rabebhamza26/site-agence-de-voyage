import { NgModule } from '@angular/core';

// src/app/app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { OffreComponent } from './offre/offre.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminComponent } from './admin/admin.component';
import { AgenceListComponent } from './agence-list/agence-list.component';
import { AgenceFormComponent } from './agence-form/agence-form.component';
import { GestionUtilisateurComponent } from './gestion-utilisateur/gestion-utilisateur.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'offre', component: OffreComponent },
  { path: 'reservationclient', component: ReservationComponent },
  { path: 'dashboardAdmin', component: AdminComponent },
    { path: 'gestionUtilisateur', component: GestionUtilisateurComponent },
    
     { path: 'listereservations', component: ReservationFormComponent },

  { path: 'agences', component: AgenceListComponent },
  { path: 'agences/ajouter', component: AgenceFormComponent },
  { path: 'agences/modifier/:id', component: AgenceFormComponent },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
