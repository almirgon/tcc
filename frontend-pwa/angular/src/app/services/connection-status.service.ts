import { Injectable } from '@angular/core';
import {ConnectionService} from 'ng-connection-service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ConnectionStatusService {

  constructor(private connectionCheck: ConnectionService, private toast: ToastrService) { 
    this.connectionCheck.monitor().subscribe((hasConnection) => {
      if(hasConnection){
        this.toast.info("Conexão restabelecida", "Online") 
      }else{
        this.toast.info("Verifique sua conexão", "Offline") 
      }
    })
  }
}