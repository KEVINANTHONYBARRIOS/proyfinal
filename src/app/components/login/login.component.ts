


import { Component } from '@angular/core';
import { AuthFirebaseService } from '../../service/auth-firebase.service'; // Importa el servicio de autenticación
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMensaje: string = '';

  constructor(
    private authService: AuthFirebaseService,
    private router: Router
  ) {}

  // Método para iniciar sesión con correo y contraseña
  login() {
    this.authService
      .login(this.email, this.password)
      .then((doc) => {
        doc.subscribe((userData) => {
          if (userData.exists) {
            const userD: any = userData.data();
            console.log(userD);

            if (userD.rol === 'admin') {
              console.log('admin ');
              this.router.navigate(['/admin']); // Redirige a admin si es administrador
            } else {
              console.log('cliente ');
              this.router.navigate(['/bienvenida']); // Redirige a bienvenida si no
            }
          }
        });
      })
      .catch((error) => {
        this.errorMensaje = 'Contraseña o usuario inválidos';
        console.error('Error durante el login:', error);
      });
  }

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => {
        this.router.navigate(['/bienvenida']); // Redirige después del inicio de sesión
      })
      .catch((error) => {
        console.error('Error durante el inicio de sesión con Google:', error);
        this.errorMensaje = 'Ocurrió un error durante el inicio de sesión.';
      });
  }

  goToRegister() {
    this.router.navigate(['/registro']); // Redirige a la ruta de registro
  }
}
