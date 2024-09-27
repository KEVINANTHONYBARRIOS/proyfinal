import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app'; // Importa firebase

@Injectable({
  providedIn: 'root',
})
export class AuthFirebaseService {
  user!: Observable<any>;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('usuarios')
            .doc(user.uid)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  registrar(
    name: string,
    surname: string,
    ci: string,
    email: string,
    password: string,
    rol: string
  ) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Inserción en Firestore
        return this.firestore.collection('usuarios').doc(result.user?.uid).set({
          name,
          surname,
          ci,
          email,
          rol,
        });
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        return error; // Manejo de errores
      });
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        return this.firestore.collection('usuarios').doc(uid).get();
      });
  }

  // Método para iniciar sesión con Google
  loginWithGoogle(): Promise<void> { // Asegúrate de que la función retorne una Promesa
    const provider = new firebase.auth.GoogleAuthProvider(); // Crea un proveedor de Google
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user; // Obtén el usuario
        if (user) {
          // Guarda o actualiza el usuario en Firestore
          return this.firestore.collection('usuarios').doc(user.uid).set({
            email: user.email,
            rol: 'cliente', // Asigna un rol, si es necesario
          }, { merge: true }); // Usa 'merge: true' para evitar sobreescribir
        }
        return Promise.resolve(); // Asegura que se retorne una promesa si no hay usuario
      })
      .catch((error) => {
        console.error('Error durante el inicio de sesión con Google:', error);
        throw error; // Lanza el error para manejarlo más adelante si es necesario
      });
  }

  logout() {
    return this.afAuth.signOut();
  }

  getUser(): Observable<any> {
    return this.user;
  }
}
