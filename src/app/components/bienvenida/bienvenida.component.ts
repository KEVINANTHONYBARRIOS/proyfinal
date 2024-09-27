import { Component } from '@angular/core';
import { AuthFirebaseService } from '../../service/auth-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css',
})
export class BienvenidaComponent {
  constructor(
    private authService: AuthFirebaseService,
    private route: Router
  ) {}
  logout() {
    this.authService
      .logout()
      .then(() => {
        this.route.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al cerrar sesión: ', error);
      });
  }
}
