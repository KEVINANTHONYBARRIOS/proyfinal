import { Component } from '@angular/core';
import { AuthFirebaseService } from '../../service/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  name: string = '';
  surname: string = '';
  ci: string = '';
  email: string = '';
  password: string = '';
  errorMensaje: string = '';
  rol: string = 'cliente';
  constructor(
    private authService: AuthFirebaseService,
    private router: Router
  ) {}
  registrar() {
    this.authService
      .registrar(
        this.name,
        this.surname,
        this.ci,
        this.email,
        this.password,
        this.rol
      )
      .then(() => {
        // Redirige al usuario o muestra un mensaje de éxito
        this.router.navigate(['/bienvenida']);
      })
      .catch((error) => {
        this.errorMensaje = error.message;
      });
  }


  goToLogin(){
    this.router.navigate(['../login']);

  }
}
