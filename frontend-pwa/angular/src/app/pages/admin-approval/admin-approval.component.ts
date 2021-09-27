import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PromotionService } from 'src/app/services/promotion.service';
import { Promotion } from 'src/app/models/Promotion';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  public promotionID: number;
  public promotion: Promotion; 
  public approvalPromotionForm: FormGroup;
  public loading: boolean;
  public approveRoom: boolean;


  constructor(private ativatedRoute: ActivatedRoute, private promotionService: PromotionService, private router: Router) {
  
    this.ativatedRoute.params.subscribe((params) => {
      this.promotionID = params['id'];
    })
    this.approvalPromotionForm = new FormGroup({
      soldBy: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      photo: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
   }

  ngOnInit(): void {
    this.loading = true;
    this.approveRoom = false;
    this.promotionService.getPromotionById(this.promotionID).subscribe((data) => {
      this.promotion = data;
      this.loading = false;
      this.approveRoom = true;
    })
   
  }

  noApprove(){
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Após reprovada, a promoção não estará mais disponivel!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ED7272',
      cancelButtonColor: '#ED9292',
      confirmButtonText: 'Tenho certeza',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.promotionService.deletePromotion(this.promotionID).subscribe((response) => {
          if(response){
            Swal.fire({
              icon: 'success',
              title: 'Não Aprovada',
              text: 'A promoção foi reprovada com sucesso!',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true
            }).then(() => {
              this.router.navigate(['/admin'])
            })
          }
        }, (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocorreu um erro',
              text: 'Tente novamente mais tarde',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true
            })
        })
      }
    })
  }

  onSubmit(){
    const promotion = new Promotion();
    promotion.soldBy = this.approvalPromotionForm.get('soldBy').value;
    promotion.photo = this.approvalPromotionForm.get('photo').value;
    this.loading = true;
    this.approveRoom = false;
    this.promotionService.putPromotion(this.promotionID, promotion).subscribe((response)=>{
      if(response !== null){
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: `Aprovada!`,
          text: `Obaa a promoção foi aprovada com sucesso e já encontra-se no feed :D`,
          showConfirmButton: false,
          timer: 4000,
          timerProgressBar: true
        }).then(() => {
          this.approveRoom = true;
          this.router.navigate(['/admin'])})
      }
    }, (err) => {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Ocorreu um erro',
        text: 'Tente novamente mais tarde',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true
      }).then(() => {
        this.approveRoom = true;
        this.router.navigate(['/admin'])})
    })
  }

  isFormFieldInvalid(field: string) {
    const ctrl = this.approvalPromotionForm.get(field);
    return ctrl?.dirty && ctrl?.touched && ctrl?.dirty ;
  }

  hasError(field: string, error: string) {
    const ctrl = this.approvalPromotionForm.get(field);
    return ctrl?.dirty && ctrl?.hasError(error);
  }

}
