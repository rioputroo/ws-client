import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newMessage: any;
  messageList: string[] = [];

  num = 0;

  constructor(private service: WebsocketService) {}

  ngOnInit(): void {
    this.service.sendMessage();

    this.service.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
    const min = 10000;
    const max = 99999;
    // this.num = Math.floor(Math.random() * (max - min + 1)) + min;
    this.num = 12345;


    console.log('num', this.num);
  }

  sendMessage() {
    this.service.sendMessage();
    this.newMessage = '';
  }
}
