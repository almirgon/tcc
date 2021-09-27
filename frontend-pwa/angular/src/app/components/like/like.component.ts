import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Promotion } from 'src/app/models/Promotion';
import { PromotionService } from 'src/app/services/promotion.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmitterService } from 'src/app/services/emitter.service';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input('promotionID') promotionID: number;
  @Input('likes') numberLikes: number;
  @Output('update') updatePromotion = new EventEmitter();
  public userLogged;
  public id;

  constructor(private promotionService: PromotionService, private authService: AuthService, private emitter: EmitterService) { 
  }

  ngOnInit(): void {
    this.userLogged = this.authService.isAuthenticated();
  }

  likedIt(){
    if(this.userLogged){
      this.updatePromotion.emit({id: this.promotionID})
    }
  }
}
