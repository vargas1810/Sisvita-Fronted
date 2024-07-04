import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = {};
  resultados: any[] = [];
  baseUrl: string = 'https://sisvitabackend.onrender.com/api'; // Cambia esto según sea necesario
  estudianteId: number | null = null;

  constructor(private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    const storedEstudianteId = localStorage.getItem('estudianteId');
    if (storedEstudianteId) {
      this.estudianteId = +storedEstudianteId;
      this.loadUsuario(this.estudianteId);
      this.loadResultados(this.estudianteId);
    } else {
      console.error('No hay ID de estudiante disponible');
    }
  }

  loadUsuario(estudianteId: number): void {
    this.getUsuario(estudianteId).subscribe(data => {
      this.usuario = data;
    });
  }

  loadResultados(estudianteId: number): void {
    this.getResultados(estudianteId).subscribe(data => {
      this.resultados = data;
    });
  }

  getUsuario(estudianteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario/${estudianteId}`);
  }

  getResultados(estudianteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/resultados_estudiante/${estudianteId}`);
  }
  goToAnterior(): void {
    this.router.navigate(['/dashboard-inicial']);
    
  }
}
