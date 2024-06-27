import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-inicial',
  templateUrl: './dashboard-inicial.component.html',
  styleUrls: ['./dashboard-inicial.component.css']
})
export class DashboardInicialComponent {
  constructor(private router: Router) { }
  
  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
    
  }
  goToPerfil(): void {
    this.router.navigate(['/perfil']);
    
  }

  goToMapa(): void {
    this.router.navigate(['/mapa']);
    
  }
  goToSalir(): void {
    this.router.navigate(['/login']);
    
  }

  
  

}
