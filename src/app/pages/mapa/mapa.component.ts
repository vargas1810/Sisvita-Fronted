import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  standalone: true,
  imports: [HttpClientModule]
})
export class MapaComponent implements OnInit, OnDestroy {
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -12.0464; // Latitud de Lima
  lng = -77.0428; // Longitud de Lima
  zoom = 10;
  markers: mapboxgl.Marker[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoidmFyZ2FzamVmZmVyIiwiYSI6ImNseTU0YWJteTA5bmsya29tNDVoMzhqOXMifQ.Jtl2CcmkjhJFnuPHYDbj-g'; // Reemplaza con tu token de Mapbox
    this.initializeMap();

    this.http.get('https://sisvitabackend.onrender.com/api/usuarios/localizacion')
      .subscribe((res: any) => {
        console.log('Datos recibidos del backend:', res); // Verificar datos recibidos
        this.addMarkers(res);
      }, error => {
        console.error('Error al cargar las ubicaciones:', error);
      });
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  initializeMap() {
    this.map = new mapboxgl.Map({
      container: 'map', // ID del contenedor del mapa
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  addMarkers(users: any[]) {
    users.forEach((user) => {
      const { latitud, longitud, nombre_usuario, email, ciudad, color_test_1, color_test_2 } = user;

      // Verifica las coordenadas recibidas
      console.log('Latitud:', latitud, 'Longitud:', longitud);

      const popupContent = `
        <h3>${nombre_usuario}</h3>
        <p>${email}</p>
        <p>${ciudad}</p>
      `;

      function isValidColor(strColor: string) {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
      }

      // Crear y añadir un marcador para color_test_1
      if (color_test_1 && color_test_1 !== 'gray' && isValidColor(color_test_1)) {
        const el1 = document.createElement('div');
        el1.className = 'marker';
        el1.style.backgroundColor = color_test_1;
        el1.style.width = '15px'; // Ajustar tamaño del marcador
        el1.style.height = '15px'; // Ajustar tamaño del marcador
        el1.style.borderRadius = '50%';

        // Verifica el color aplicado
        console.log('Color test 1:', color_test_1);
        console.log('Elemento 1 creado con color:', el1.style.backgroundColor);

        const marker1 = new mapboxgl.Marker(el1)
          .setLngLat([longitud, latitud])
          .setPopup(new mapboxgl.Popup().setHTML(popupContent))
          .addTo(this.map);

        this.markers.push(marker1);
      } else {
        console.log('Color test 1 no es válido:', color_test_1);
      }

      // Crear y añadir un marcador para color_test_2
      if (color_test_2 && color_test_2 !== 'gray' && isValidColor(color_test_2)) {
        const el2 = document.createElement('div');
        el2.className = 'marker';
        el2.style.backgroundColor = color_test_2;
        el2.style.width = '15px'; // Ajustar tamaño del marcador
        el2.style.height = '15px'; // Ajustar tamaño del marcador
        el2.style.borderRadius = '50%';

        // Verifica el color aplicado
        console.log('Color test 2:', color_test_2);
        console.log('Elemento 2 creado con color:', el2.style.backgroundColor);

        const marker2 = new mapboxgl.Marker(el2)
          .setLngLat([longitud, latitud])
          .setPopup(new mapboxgl.Popup().setHTML(popupContent))
          .addTo(this.map);

        this.markers.push(marker2);
      } else {
        console.log('Color test 2 no es válido:', color_test_2);
      }
    });
  }

  applyColorFilter() {
    const selectedColor = (document.getElementById('colorFilter') as HTMLSelectElement).value;

    this.markers.forEach(marker => {
      const markerElement = marker.getElement() as HTMLElement;
      const markerColor = markerElement.style.backgroundColor;

      if (selectedColor === 'all' || markerColor === selectedColor) {
        marker.addTo(this.map);
      } else {
        marker.remove();
      }
    });
  }
}
