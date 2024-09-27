import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthFirebaseService } from '../../service/auth-firebase.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  selectedUser: any = null;
  constructor(
    private userService: UserService,
    private authService: AuthFirebaseService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.users = res.map((e) => ({
        id: e.payload.doc.id,
        ...(e.payload.doc.data() as {}),
      }));
    });
  }

  changeRole(userId: string, newRole: string) {
    this.userService.changeRole(userId, newRole);
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; // Copia el usuario para editar
  }

  saveUser() {
    if (this.selectedUser) {
      this.userService.editUser(this.selectedUser.id, this.selectedUser);
      this.selectedUser = null; // Restablecer después de guardar
    }
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId);
  }
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
  // getUsers() {
  //   this.firestore
  //     .collection('usuarios')
  //     .snapshotChanges() //: Este método permite escuchar cambios en tiempo real en la colección. Cuando hay una modificación, eliminación o adición de un documento, se disparará la función dentro del subscribe.
  //     .subscribe((res) => {
  //       //Este es un observador que se activa cada vez que hay un cambio. El resultado se almacena en res
  //       this.users = res.map((e) => ({
  //         //Se itera sobre cada elemento del array res, donde e representa cada cambio en la colección.
  //         id: e.payload.doc.id, //Obtiene el ID del documento. Este ID es único para cada usuario.
  //         ...(e.payload.doc.data() as {}), //operador de propagación Toma todas las propiedades del documento (que ya existen en Firestore) y las copia en el nuevo objeto.
  //       }));
  //       console.log(this.users);
  //     });
  // }
  // changeRole(userId: string, newRole: string) {
  //   this.firestore.collection('usuarios').doc(userId).update({ rol: newRole });
  // }

  // editUser(user: any) {
  //   this.selectedUser = { ...user }; // Copia el usuario para editar
  // }

  // saveUser() {
  //   if (this.selectedUser) {
  //     this.firestore
  //       .collection('usuarios')
  //       .doc(this.selectedUser.id)
  //       .update(this.selectedUser);
  //     this.selectedUser = null; // Restablecer después de guardar
  //   }
  // }

  // deleteUser(userId: string) {
  //   this.firestore.collection('usuarios').doc(userId).delete();
  // }
}
