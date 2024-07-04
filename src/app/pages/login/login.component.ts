import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    this.http.post('https://sisvitabackend.onrender.com/api/login', this.loginObj)
      .subscribe((res: any) => {
        if (res.authenticated) {
          // Reemplaza alert(res.message) con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Login Exitoso',
            text: res.message,
            showConfirmButton: false,
            timer: 1500
          });

          console.log(res.user.rol_id);

          if (res.user.rol_id === 1) {
            localStorage.setItem('estudianteId', res.user.id);  // Guarda el ID del estudiante en localStorage
            this.router.navigateByUrl('/dashboard-inicial');
          } else if (res.user.rol_id === 2) {
            this.router.navigateByUrl('/dashboard2');
          } else {
            // Reemplaza alert('rol desconocido') con SweetAlert2
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Rol desconocido',
              showConfirmButton: false,
              timer: 1500
            });
          }
        } else {
          // Reemplaza alert(res.message) con SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }, error => {
        console.error('Error en la solicitud:', error);
        // Reemplaza alert('Hubo un problema al intentar iniciar sesión.') con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al intentar iniciar sesión.',
          showConfirmButton: false,
          timer: 1500
        });
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
