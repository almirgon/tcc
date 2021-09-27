import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Promotion } from 'src/app/models/Promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import { EmitterService } from 'src/app/services/emitter.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public promotions: Array<Promotion> = [];
  public loading: boolean;

  constructor(private router: Router, private promotionService: PromotionService, private emitter: EmitterService) {
    this.loading = false;
   }

  ngOnInit(): void {
    this.loading = true;
    this.promotionService.getActivesPromotions().subscribe((response) =>{
      this.loading = false;
      response.forEach((data) => {
        this.promotions.push(data);
      })
    })
    
  }

  redirectTo(promotion) {
    this.router.navigate(['/promotion', promotion.id]);
  }

  goToWebSite(urlLink){
    return window.open(urlLink, '_blank') 
  }

  likePromotion(e, i){
    this.promotionService.like(e.id).subscribe((res) => {
      this.promotions[i] = res;
    })
  }

}
