import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule] // Importa FormsModule aquí
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  ciudades: string[] = [];
  condiciones: string[] = [];
  private baseUrl = 'https://sisvitabackend.onrender.com/api'; // Cambia esto a tu URL base del backend

  filtroCiudad: string = '';
  filtroTipoTest: string = '';
  filtroCondicion: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUsuarioLocalizacion();
  }

  getUsuarioLocalizacion(): void {
    this.http.get<any[]>(`${this.baseUrl}/informacion`).subscribe(
      (data) => {
        this.usuarios = data;
        this.extrairFiltros(data);
        this.filtrarUsuarios(); // Inicializar el filtrado
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  extrairFiltros(usuarios: any[]): void {
    this.ciudades = Array.from(new Set(usuarios.map(user => user.ciudad).filter(Boolean)));
    const condicionesTest1 = usuarios.map(user => user.condicion_test_1).filter(Boolean);
    const condicionesTest2 = usuarios.map(user => user.condicion_test_2).filter(Boolean);
    this.condiciones = Array.from(new Set([...condicionesTest1, ...condicionesTest2]));
  }

  filtrarUsuarios(): void {
    this.usuariosFiltrados = this.usuarios.filter(usuario => {
      const coincideCiudad = !this.filtroCiudad || usuario.ciudad === this.filtroCiudad;
      const coincideCondicion = !this.filtroCondicion ||
        (this.filtroTipoTest === '1' && usuario.condicion_test_1 === this.filtroCondicion) ||
        (this.filtroTipoTest === '2' && usuario.condicion_test_2 === this.filtroCondicion) ||
        (!this.filtroTipoTest && (usuario.condicion_test_1 === this.filtroCondicion || usuario.condicion_test_2 === this.filtroCondicion));
      const coincideTipoTest = !this.filtroTipoTest || 
        (this.filtroTipoTest === '1' && usuario.color_test_1 !== 'gray') || 
        (this.filtroTipoTest === '2' && usuario.color_test_2 !== 'gray');

      return coincideCiudad && coincideCondicion && coincideTipoTest;
    });
  }
}
