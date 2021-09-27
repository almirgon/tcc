import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Promotion } from 'src/app/models/Promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import { EmitterService } from 'src/app/services/emitter.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  private promotionID: number;
  public promotion: Promotion;
  public myPage: boolean;
  public loading: boolean;

  constructor(private ativatedRoute: ActivatedRoute, private promotionService: PromotionService, private emitter: EmitterService) { 
    
  }

  ngOnInit(): void {
    this.loading = true;
    this.myPage = false;
    this.ativatedRoute.params.subscribe((params) => {
      this.promotionID = params['id'];
    })

    this.promotionService.getPromotionById(this.promotionID).subscribe((response) => {
      this.promotion = response;
      this.loading = false;
      this.myPage = true;
    })
  }

  likePromotion(event){
    this.promotionService.like(event.id).subscribe((res) => {
      this.promotion = res;
    })
  }

  goToWebSite(urlLink){
    return window.open(urlLink, '_blank') 
  }
}
