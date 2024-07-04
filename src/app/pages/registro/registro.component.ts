import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
  roles: any[] = []; // Array para almacenar los roles

  baseUrl: string = 'https://sisvitabackend.onrender.com/api'; // Cambia esto según sea necesario

  constructor(private http: HttpClient, private router: Router) {
    this.registerObj = new Register();
  }

  ngOnInit(): void {
    this.loadCiudades();
    this.loadRoles(); // Cargar roles al inicializar el componente
  }

  loadCiudades(): void {
    this.getCiudades().subscribe(data => {
      console.log('Ciudades recibidas:', data); // Verificar si los datos se están recibiendo
      this.ubigeos = data;
    }, error => {
      console.error('Error al cargar las ciudades:', error);
    });
  }

  getCiudades(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ubigeos`);
  }

  loadRoles(): void {
    this.getRoles().subscribe(data => {
      console.log('Roles recibidos:', data); // Verificar si los datos se están recibiendo
      this.roles = data;
    }, error => {
      console.error('Error al cargar los roles:', error);
    });
  }

  getRoles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/roles`);
  }

  onRegister() {
    this.http.post(`${this.baseUrl}/register`, this.registerObj)
      .subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: 'Usuario registrado correctamente.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log('Usuario registrado:', res);
        this.router.navigateByUrl('/login');
      }, error => {
        console.error('Error en la solicitud de registro:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message || 'Hubo un problema al intentar registrarse.',
          showConfirmButton: false,
          timer: 1500
        });
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
