import { Component } from '@angular/core';
import {ConnectionStatusService} from './services/connection-status.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Promotion';
  constructor(private connectionCheck: ConnectionStatusService){
  }
}

