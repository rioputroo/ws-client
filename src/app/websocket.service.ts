import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnInit {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}

  ngOnInit(): void {}

  socket = io('https://dev-socketio.paydia.co.id/paydia', {
    auth: {
      token: 'YzYxY2IxODU5YjE4ZTc1NzAxMDk0MTY4ZjVmMzQxMmI2ZGM3M2NjZjFkNGU3MjA3NTEzYTQ3ZmQ0MGNhMjQ3YQ==',
    },
    transports: ['websocket'],
    rejectUnauthorized: false,
  });

  public sendMessage() {
    this.socket.emit('pb_event_update_saldo', '12345');
  }

  public getNewMessage = () => {
    this.socket.on('connect', () => {
      console.log('connected!');
      this.socket.emit('12345', Math.floor(Math.random() * 1000));
    });

    this.socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err}`);
    });

    this.socket.on('12345', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
