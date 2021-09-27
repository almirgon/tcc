import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {EmitterService} from '../../services/emitter.service'

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logged: boolean;
  public admin: boolean;

  constructor(private route: Router, private authService: AuthService, private emitter: EmitterService) { 
    this.logged = false;
    this.admin = false;
    if( this.authService.getRole() === 'ADMIN' && this.authService.getToken()){
      this.logged = true;
      this.admin = true;
    }

    if(this.authService.getRole() === 'CLIENT' && this.authService.getToken()){
      this.logged = true;
      this.admin = false;
    }
  }

  ngOnInit(): void {
    this.emitter.getValues().subscribe((data) => data.forEach(element => {
      this.logged = element.logged;
      this.admin = element.admin;
    }));
     
  }

  approvePromotion(){
    this.route.navigate(['/admin'])
  }

  addPromotion(){
    this.route.navigate(['/share'])
  }

  logOut(){
    this.logged = false;
    this.authService.logout();
    this.route.navigate(['/home'])
  }

  goToLogin(){
    this.route.navigate(['/login'])

  }

  goToHome(){
    this.route.navigate(['/home'])
  }

}
