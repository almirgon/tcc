import { Component, OnInit } from '@angular/core';
import {EmitterService} from '../../services/emitter.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public open:boolean;
  public loading: boolean;
  public registerForm: FormGroup;

  constructor(private emitter: EmitterService, private userService: UserService, private authService: AuthService, private router: Router) { 
    this.open = false;
    this.loading = false;
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  ngOnInit(): void {
    this.emitter.getValues().subscribe((data) => data.forEach((element: any) => {
      this.open = element.press;
    }));
  }

  onSubmit(): void{
    const user = new User();
    user.firstName = this.registerForm.get('name').value;
    user.lastName = this.registerForm.get('lastName').value;
    user.email = this.registerForm.get('email').value;
    user.password = this.registerForm.get('password').value;
    this.open = false;
    this.loading = true;
    let email = this.registerForm.get("email")?.value;
    let password = this.registerForm.get("password")?.value;
    let credentials = { email: email, password: password }

    this.userService.createUser(user).subscribe((response) => {
      if(response.status === 201){
        
        Swal.fire({
          icon: 'success',
          title: `Cadastro Realizado com Sucesso`,
          text: `Olá ${response.body.firstName}! Seja bem vindo ao Promotion`,
          showConfirmButton: true,
          confirmButtonColor: '#ED7272',
          confirmButtonText: "Vamos lá :P",
        }).then((result) => {
          if (result.isConfirmed){
            this.authService.login(credentials).subscribe((response) => {
              if(response.status === 200){
                let myUser = [{logged: true, admin: false}];
                this.emitter.myValues(myUser);
                this.authService.saveToken(response.body.token)
                this.authService.saveName(response.body.userDTO.firstName)
                this.authService.saveEmail(response.body.userDTO.email)
                this.authService.saveRole(response.body.userDTO.role)
                this.router.navigate(['/home'])
              }
            })
          }
        })
        this.loading = false;
        this.open = false;
      }else{
        Swal.fire({
          icon: 'error',
          title: `Ocorreu um erro no seu cadastro`,
          text: `Tente novamente mais tarde!`,
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true
        })
        this.loading = false;
        this.open = true;
      }
    })
  }

  isFormFieldInvalid(field: string) {
    const ctrl = this.registerForm.get(field);
    return ctrl?.dirty && ctrl?.touched && ctrl?.dirty ;
  }

  hasError(field: string, error: string) {
    const ctrl = this.registerForm.get(field);
    return ctrl?.dirty && ctrl?.hasError(error);
  }

  isPasswordDifferent(): boolean{
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

}