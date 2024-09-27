import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'; 
import { ref, set, onValue } from 'firebase/database'; 
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root',
})
export class FbRealTimeService {
  private ledPath = 'sensorespathData';
  private tvPath = 'sensorespathTele'; // Ruta para el estado de la TV
  private pcPath = 'sensorespathComp'; // Ruta para el estado de la PC
  private telegramToken = '7739012573:AAHWOBPiLp-cS8fD5gVtS4ytmdoDHHRBnQ0'; 
  public chatId = '1321040101'; // Reemplaza con tu ID de chat
  private telegramUrl = `https://api.telegram.org/bot${this.telegramToken}/sendMessage`;

  constructor(private db: AngularFireDatabase, private http: HttpClient) {}

  // Métodos para Data
  getDataState(callback: (state: number) => void) {
    const dataRef = ref(this.db.database, this.ledPath);
    onValue(
      dataRef,
      (snapshot) => {
        const state = snapshot.val();
        callback(state);
        this.sendNotification(state, 'Data');
      },
      (error) => {
        console.error('Error al leer el estado de Data: ', error);
        callback(0);
      }
    );
  }

  setDataState(state: number) {
    const dataRef = ref(this.db.database, this.ledPath);
    set(dataRef, state)
      .then(() => {
        console.log('Estado de Data actualizado:', state);
        this.sendNotification(state, 'Data');
      })
      .catch((error) => console.error('Error al actualizar el estado de Data: ', error));
  }

  // Métodos para TV
  getTvState(callback: (state: number) => void) {
    const tvRef = ref(this.db.database, this.tvPath);
    onValue(
      tvRef,
      (snapshot) => {
        const state = snapshot.val();
        callback(state);
        this.sendNotification(state, 'TV');
      },
      (error) => {
        console.error('Error al leer el estado de la TV: ', error);
        callback(0);
      }
    );
  }

  setTvState(state: number) {
    const tvRef = ref(this.db.database, this.tvPath);
    set(tvRef, state)
      .then(() => {
        console.log('Estado de la TV actualizado:', state);
        this.sendNotification(state, 'TV');
      })
      .catch((error) => console.error('Error al actualizar el estado de la TV: ', error));
  }

  // Métodos para PC
  getPcState(callback: (state: number) => void) {
    const pcRef = ref(this.db.database, this.pcPath);
    onValue(
      pcRef,
      (snapshot) => {
        const state = snapshot.val();
        callback(state);
        this.sendNotification(state, 'PC');
      },
      (error) => {
        console.error('Error al leer el estado de la PC: ', error);
        callback(0);
      }
    );
  }

  setPcState(state: number) {
    const pcRef = ref(this.db.database, this.pcPath);
    set(pcRef, state)
      .then(() => {
        console.log('Estado de la PC actualizado:', state);
        this.sendNotification(state, 'PC');
      })
      .catch((error) => console.error('Error al actualizar el estado de la PC: ', error));
  }

  private sendNotification(state: number, device: string) {
    const value = state === 1 ? 'encendido' : 'apagado';
    const message = state === 0 
      ? `El dispositivo ${device} no se encuentra en su lugar` 
      : `${device} está ${value}`;
      
    const body = {
      chat_id: this.chatId,
      text: message,
    };

    this.http.post(this.telegramUrl, body).subscribe(
      () => console.log(`Notificación enviada a Telegram para ${device}`),
      (error) => console.error(`Error al enviar notificación a Telegram para ${device}: `, error)
    );
  }
}
