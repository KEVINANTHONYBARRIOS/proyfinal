import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFirebaseService } from '../service/auth-firebase.service';
import { map } from 'rxjs';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthFirebaseService); // Inyectamos el servicio de autenticación
  const router = inject(Router); // Inyectamos el enrutador para redirigir

  return authService.getUser().pipe(
    map((user) => {
      if (user && user.rol === 'admin') {
        return true; // Permitir acceso si el usuario es administrador
      } else {
        router.navigate(['/bienvenida']); // Redirigir si no es admin
        return false; // Bloquear acceso si no es admin
      }
    })
  );
};
