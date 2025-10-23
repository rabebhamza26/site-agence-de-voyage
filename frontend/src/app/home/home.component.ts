import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AgencesService } from '../services/agences.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  agences: any[] = [];

  constructor(private offreService: AgencesService) {}

  ngOnInit(): void {
    this.offreService.getListAgences().subscribe(data => {
      this.agences = data.slice(0, 3); // affiche seulement les 3 premières agences
    });
  }
}
