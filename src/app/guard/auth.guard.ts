import { CanActivateFn } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
export const authGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el router para redirigir si es necesario

  return afAuth.authState.pipe(
    map((user) => {
      if (user) {
        // Si el usuario está autenticado, permite el acceso
        return true;
      } else {
        //si no esta autenticado nos retorna al login
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
