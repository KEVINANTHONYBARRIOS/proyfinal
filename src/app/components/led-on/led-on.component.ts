import { Component } from '@angular/core';
import { FbRealTimeService } from '../../service/fb-real-time.service';
import { Router } from '@angular/router';
import { AuthFirebaseService } from '../../service/auth-firebase.service';

@Component({
  selector: 'app-led-on',
  templateUrl: './led-on.component.html',
  styleUrls: ['./led-on.component.css'],
})
export class LedOnComponent {
  ledState: number = 0; // 0 para apagado, 1 para encendido
  tvState: number = 0; // 0 para TV desconectada, 1 para TV conectada
  pcState: number = 0; // 0 para PC desconectada, 1 para PC conectada
  

  constructor(private firebaseService: FbRealTimeService, private route: Router,   private authService: AuthFirebaseService,) {}

  ngOnInit(): void {
    // Obtener el estado inicial de los dispositivos
    this.firebaseService.getDataState((state) => {
      this.ledState = state || 0; // Si no hay estado, asigna 0
    });
    this.firebaseService.getTvState((state) => {
      this.tvState = state || 0; // Si no hay estado, asigna 0
    });
    this.firebaseService.getPcState((state) => {
      this.pcState = state || 0; // Si no hay estado, asigna 0
    });
  }

  toggleLed() {
    this.ledState = this.ledState === 0 ? 1 : 0;
    this.firebaseService.setDataState(this.ledState);
  }

  toggleTv() {
    this.tvState = this.tvState === 0 ? 1 : 0;
    this.firebaseService.setTvState(this.tvState);
  }

  togglePc() {
    this.pcState = this.pcState === 0 ? 1 : 0;
    this.firebaseService.setPcState(this.pcState);
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
  
}
