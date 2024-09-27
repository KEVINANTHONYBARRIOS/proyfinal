import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}
  getUsers() {
    return this.firestore.collection('usuarios').snapshotChanges();
  }

  changeRole(userId: string, newRole: string) {
    return this.firestore
      .collection('usuarios')
      .doc(userId)
      .update({ rol: newRole });
  }

  editUser(userId: string, userData: any) {
    return this.firestore.collection('usuarios').doc(userId).update(userData);
  }

  deleteUser(userId: string) {
    return this.firestore.collection('usuarios').doc(userId).delete();
  }
}
