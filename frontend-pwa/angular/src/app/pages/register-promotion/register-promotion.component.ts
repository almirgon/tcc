import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Promotion } from 'src/app/models/Promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register-promotion',
  templateUrl: './register-promotion.component.html',
  styleUrls: ['./register-promotion.component.css']
})
export class RegisterPromotionComponent implements OnInit {

  public sharePromotionForm: FormGroup;
  public loading: boolean;
  public register: boolean;

  constructor(private promotionService: PromotionService, private router: Router) { 
    this.loading = false;
    this.register = true;
    this.sharePromotionForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]),
      description: new FormControl('', [Validators.minLength(10), Validators.maxLength(200)]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      urlLink: new FormControl('', [Validators.required]),
      voucher: new FormControl('', [Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(){
    const promotion = new Promotion();
    promotion.name = this.sharePromotionForm.get('name').value;
    promotion.description = this.sharePromotionForm.get('description').value;
    promotion.price = this.sharePromotionForm.get('price').value;
    promotion.urlLink = this.sharePromotionForm.get('urlLink').value;
    promotion.voucher = this.sharePromotionForm.get('voucher').value;
    this.loading = true;
    this.register = false;
    this.promotionService.createPromotion(promotion).subscribe((response)=> {
      if(response.status === 201){
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: `Promoção cadastrada com Sucesso`,
          text: `Sua promoção será avaliada por nossos administradores, se aprovada, logo estará no feed :D`,
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          willClose: () => {
            this.register = true;
            this.router.navigate(['/home'])
          }
        })
      }
    }, (err) => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: `Ocorreu um erro no cadastro`,
        text: `Tente novamente mais tarde! :(`,
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        willClose: () => {
          this.register = true;
          this.router.navigate(['/home'])
        }
      })
    })

  }

  isFormFieldInvalid(field: string) {
    const ctrl = this.sharePromotionForm.get(field);
    return ctrl?.dirty && ctrl?.touched && ctrl?.dirty ;
  }

  hasError(field: string, error: string) {
    const ctrl = this.sharePromotionForm.get(field);
    return ctrl?.dirty && ctrl?.hasError(error);
  }

}
