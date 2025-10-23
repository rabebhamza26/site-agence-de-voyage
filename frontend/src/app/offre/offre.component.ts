import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AgencesService } from '../services/agences.service';


@Component({
  selector: 'app-offre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.css'
})
export class OffreComponent implements OnInit {

  agences: any[] = [];

  constructor(private agencesService: AgencesService) {}

  ngOnInit(): void {
    this.agencesService.getListAgences().subscribe(data => {
      this.agences = data;
    });
  }
}