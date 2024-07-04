import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component {
  constructor(private router: Router) { }
  
  goToMapa(): void {
    this.router.navigate(['/mapa']);
  }

  goToUsuario(): void {
    this.router.navigate(['/usuario']);
  }

  goToSalir(): void {
    this.router.navigate(['/login']);
  }
}
