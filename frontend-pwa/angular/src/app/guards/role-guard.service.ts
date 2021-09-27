import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, public toast: ToastrService) {
   }
   canActivate(): boolean {
    const myRole = localStorage.getItem('role');
    const token = localStorage.getItem('token')
    if (myRole === 'ADMIN' && token !== null) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
