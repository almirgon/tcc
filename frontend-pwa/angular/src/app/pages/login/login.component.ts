import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EmitterService} from '../../services/emitter.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public close: boolean;
  public loginForm: FormGroup;
  public loading: boolean;
  public login: boolean;

  constructor(private emitter: EmitterService, private router: Router, private authService: AuthService, private toast: ToastrService) { 
    this.close = true;
    this.login = true;
    this.loading = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
      }); 
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    let email = this.loginForm.get("email")?.value;
    let password = this.loginForm.get("password")?.value;
    let credentials = { email: email, password: password }
    this.login = false;
    this.loading = true;

    this.authService.login(credentials).subscribe((response) => {
      if(response.status === 200){
        this.authService.saveToken(response.body.token)
        this.authService.saveName(response.body.userDTO.firstName)
        this.authService.saveEmail(response.body.userDTO.email)
        this.authService.saveRole(response.body.userDTO.role)
        this.loading = false;
        this.login = true;
        if(localStorage.getItem('role') === 'ADMIN'){
          this.toast.success("Olá Admin") 
          let admin = [{logged: true, admin: true}];
          this.emitter.myValues(admin);
          this.router.navigate(['/admin'])
        }else{
          let withoutAdmin = [{logged: true, admin: false}];
          this.emitter.myValues(withoutAdmin);
          this.router.navigate(['/home'])
        }
        
      }
    }, (err) => {
      console.log(err)
        this.toast.error(`${err.error.message}`)
        this.loading = false;
        this.login = true;
    })
  }

  touch(){
    let userPress = [{press: true}];
    this.emitter.myValues(userPress);
    this.close = false;
  }

  forgotPassword(){
    this.router.navigate(['/forgot-password']);
  }

  isFormFieldInvalid(field: string) {
    const ctrl = this.loginForm.get(field);
    return ctrl?.dirty && ctrl?.touched && ctrl?.dirty ;
  }

  hasError(field: string, error: string) {
    const ctrl = this.loginForm.get(field);
    return ctrl?.dirty && ctrl?.hasError(error);
  }

}
