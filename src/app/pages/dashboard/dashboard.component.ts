import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tiposTests: any[] = [];
  preguntas: any[] = [];
  respuestas: any[] = [];
  resultados: any[] = [];
  baseUrl: string = 'http://localhost:5000/api'; // Cambia esto según sea necesario
  estudianteId: number | null = null;
  selectedTipoTestId: number | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const storedEstudianteId = localStorage.getItem('estudianteId');
    if (storedEstudianteId) {
      this.estudianteId = +storedEstudianteId;
      this.loadTiposTests();
    } else {
      console.error('No hay ID de estudiante disponible');
    }
  }

  loadTiposTests(): void {
    this.getTiposTests().subscribe(data => {
      this.tiposTests = data;
    });
  }

  onTipoTestChange(event: any): void {
    this.selectedTipoTestId = +event.target.value; // Asegúrate de convertir a número
    if (this.selectedTipoTestId) {
      this.loadPreguntas(this.selectedTipoTestId);
      this.loadRespuestas(this.selectedTipoTestId);
    }
  }

  loadPreguntas(tipoTestId: number): void {
    this.getPreguntas(tipoTestId).subscribe(data => {
      this.preguntas = data;
    });
  }

  loadRespuestas(tipoTestId: number): void {
    this.getRespuestas().subscribe(data => {
      this.respuestas = data.filter((respuesta: any) => respuesta.tipo_test_id === tipoTestId);
    });
  }

  getTiposTests(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tipos_tests`);
  }

  getPreguntas(tipoTestId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/preguntas/${tipoTestId}`);
  }

  getRespuestas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/respuestas`);
  }

  submitRespuesta(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/resultados_preguntas`, data);
  }

  onSubmit(preguntaId: number, respuestaId: number): void {
    if (this.estudianteId === null || this.selectedTipoTestId === null) {
      console.error('No hay ID de estudiante o tipo de test disponible');
      return;
    }

    const resultado = {
      estudiante_id: this.estudianteId,
      pregunta_id: preguntaId,
      respuesta_id: respuestaId,
      tipo_test_id: this.selectedTipoTestId
    };

    this.submitRespuesta(resultado).subscribe(response => {
      console.log('Respuesta guardada', response);
    }, error => {
      console.error('Error al guardar la respuesta', error);
    });
  }

  terminarTest(): void {
    if (this.estudianteId === null || this.selectedTipoTestId === null) {
      console.error('No hay ID de estudiante o tipo de test disponible');
      return;
    }

    this.getResultados(this.estudianteId).subscribe(response => {
      console.log('Resultado del test', response);
      alert('Test terminado: ' + response.condicion);
      // Redirigir al usuario al dashboard después de mostrar el resultado
      this.router.navigate(['/dashboard-inicial']);
    }, error => {
      console.error('Error al terminar el test', error);
      alert('Error al terminar el test: ' + error.message);
      this.router.navigate(['/dashboard-inicial']);
    });
  }

  getResultados(estudianteId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/resultados/${estudianteId}?tipo_test_id=${this.selectedTipoTestId}`);
  }
}
