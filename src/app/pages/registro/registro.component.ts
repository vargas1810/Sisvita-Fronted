import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  styleUrls: ['./registro.component.css']
})
export class RegisterComponent implements OnInit {

  registerObj: Register;
  ubigeos: any[] = [];

  baseUrl: string = 'http://localhost:5000/api'; // Cambia esto según sea necesario

  constructor(private http: HttpClient, private router: Router) {
    this.registerObj = new Register();
  }

  ngOnInit(): void {
    this.loadCiudades();
  }

  loadCiudades(): void {
    this.getCiudades().subscribe(data => {
      this.ubigeos = data;
    }, error => {
      console.error('Error al cargar las ciudades:', error);
    });
  }

  getCiudades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ubigeos`);
  }

  onRegister() {
    this.http.post(`${this.baseUrl}/register`, this.registerObj)
      .subscribe((res: any) => {
        alert('Registro Exitoso');
        console.log('Usuario registrado:', res);
        this.router.navigateByUrl('/login');
      }, error => {
        console.error('Error en la solicitud de registro:', error);
        alert(error.error.message || 'Hubo un problema al intentar registrarse.');
      });
  }

  backLogin() {
    this.router.navigateByUrl('/login');
  }
}

export class Register {
  nombre_usuario: string;
  email: string;
  password: string;
  rol: string;
  nombre_ciudad: string;

  constructor() {
    this.nombre_usuario = '';
    this.email = '';
    this.password = '';
    this.rol = '';
    this.nombre_ciudad = '';
  }
}
