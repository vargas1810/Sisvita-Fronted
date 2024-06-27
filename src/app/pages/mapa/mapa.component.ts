import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as L from 'leaflet';  // Importación de Leaflet
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {
  private map: any;
  private baseUrl: string = 'http://localhost:5000/api'; // Cambia esto según sea necesario
  usuarios: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUsuariosLocalizacion();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 2
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadUsuariosLocalizacion(): void {
    this.getUsuariosLocalizacion().subscribe(data => {
      this.usuarios = data;
      this.addMarkers();
    });
  }

  private getUsuariosLocalizacion(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/localizacion`);
  }

  private addMarkers(): void {
    this.usuarios.forEach(usuario => {
      L.marker([usuario.latitud, usuario.longitud], {
        icon: L.icon({
          iconUrl: 'assets/leaflet/marker-icon.png',
          shadowUrl: 'assets/leaflet/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41]
        })
      }).addTo(this.map)
        .bindPopup(`<b>${usuario.nombre_usuario}</b><br>${usuario.ciudad}`).openPopup();
    });
  }
}
