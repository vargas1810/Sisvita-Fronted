import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: Login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http.post('http://127.0.0.1:5000/api/login', this.loginObj)
      .subscribe((res: any) => {
        if (res.authenticated) {
          alert(res.message);  // Debería mostrar "Login Exitoso"
          console.log(res.user.rol_id);

          if (res.user.rol_id === 1) {
            localStorage.setItem('estudianteId', res.user.id);  // Guarda el ID del estudiante en localStorage
            this.router.navigateByUrl('/dashboard-inicial');
          } else if (res.user.rol_id === 2) {
            this.router.navigateByUrl('/dashboard2');
          } else {
            alert('rol desconocido');
          }
        } else {
          alert(res.message);  // Debería mostrar "Credenciales Incorrectas"
        }
      }, error => {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al intentar iniciar sesión.');
      });
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}

export class Login {
  email: string;
  password: string;
  constructor() {
    this.email = '';
    this.password = '';
  }
}