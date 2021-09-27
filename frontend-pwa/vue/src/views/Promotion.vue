<template>
  <section class="promotion-section">
    <div class="promotion" v-if="promotionPage">
    <Back class="back-btn"/>
    <like :likes="promotion.numberLikes" :idPromotion="promotion.id" class="like" @like-promotion="likeThePromotion"></like>
    <div class="my-img">
      <img :src="promotion.photo" alt="promo">
    </div>
    <div class="my-price">
      <p>{{promotion.price | toCurrency}}</p>
  </div>
  <div class="my-info">
    <h3>{{promotion.name}}</h3>
    <div class="my-local">
        <p>Vendido por {{promotion.soldBy}}</p>
    </div>
    <div class="description">
      <p class="p-description">{{promotion.description}}</p>
    </div>
  </div>
  <div class="my-buttons">
    <p v-bind:style="{'display' : promotion.voucher.length === 0 ? 'none' : 'flex'}" class="my-cupom">{{promotion.voucher}}</p>
    <button @click="goToWebSite(promotion.urlLink)" v-bind:style="{'margin' : promotion.voucher.length === 0 ? '0 auto' : 'none'}" class="btn">Acessar</button>
  </div>
  
  <div class="person">
    <avatar :customStyle="{background: '#C6EAD9', width: '40px', height: '40px'}" :username="promotion.user.firstName"></avatar>
    <div class="data">
      <p>Postado por {{promotion.user.firstName}}</p>
      <p>{{promotion.date | dateAgo}}</p>
    </div>
  </div>
</div>
<div class="myLoading" v-if="loading"> 
  <loading ></loading>
</div>
</section>

</template>

<script>
import Back from '@/components/Back.vue'
import Like from '@/components/Like.vue'
import Avatar from 'vue-avatar'
import Loading from '@/components/Loading.vue'
import PromotionService from '../services/PromotionService'
export default {
  name: 'Promotion',
  components: {
    Avatar,
    Back,
    Like,
    'loading': Loading
  },
  data(){
    return{
      promotionPage: true,
      loading: false,
      promotion: ""
    }
  },
  created() {
      this.promotionPage = false;
      this.loading = true;
      PromotionService.getPromotionById(this.$route.params.id).then((response)=>{
        this.promotion = response.data
        this.promotionPage = true;
        this.loading = false;
      })
    
  },
  methods: {
     goToWebSite(urlLink){
      return window.open(urlLink, '_blank') 
  },
   likeThePromotion(id){
    PromotionService.like(id).then((response) => {
      console.log(response)
      if(response.status === 200){
        this.promotion = response.data
      }
    })
    
  }
  }


}
</script>

<style scoped>
.my-img{
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  max-height: 400px;
  padding: 1rem;
  margin: 0 auto;
  cursor: pointer;
}

img{
  max-width: 100%;
  max-height: 100%;
}

.my-price{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
  border-radius: 4px;
  box-shadow: 0 0.2px 2.5px 0 rgb(60 64 67 / 30%), 0 1px 1.5px 0.5px rgb(60 64 67 / 15%);
  background-color: #C6EAD9;
}
.my-price p{
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 2px;
  color: #42B983;
  font-weight: 600;
}

.my-info{
  width: 100%;
  min-width: 100%;
  padding: 10px;
}


.my-info h3{
  word-break: break-all;
  font-size: 20px;
  margin-bottom: 0px;
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  color: #666666;
 
}

.my-local p{
  font-weight: 200;
}

.my-info h3:hover{
  text-decoration: underline;
}

.my-info p{
  font-size: 15px;
  color: gray;
  margin-bottom: 0px;
  max-width: 100%;
  max-height: 100%;
 
}

.like{
  margin-right: 1rem;
}

.like{
    position: absolute;
    right: 0;
    margin-right: 1rem;
}

.description{
  width: 100%;
  font-size: 15px;
  margin-top: 0.3rem;
  user-select: none;
  color: #666666;
}

.person{
  display: flex;
  align-items: center;
}

.data{
  user-select: none;
  margin-left: 0.5rem;

}

.data p:nth-child(1){
  color: whitesmoke;
}
.data p:nth-child(2){
  font-size: 12px;
  color: whitesmoke;
  text-align: start;
}

.my-buttons{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.my-cupom{
  display: block;
  padding: 10px 10px;
  background: #C6EAD9;
  border-radius: 4px;
  color: #42B983;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgb(30 60 90 / 20%);
  transition: all 0.3s;
}

.person{
  background: #42B983;
  padding: 5px;
  color: white;
}

.myLoading{
  justify-content: center;
  display: flex;
}

.promotion-section{
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 89vh;
}





@media screen and (max-width: 700px) {
  .my-img{
    width: auto;
    max-height: 500px;
  }

  .my-info{
    width: 100%;
    min-width: inherit;
    
  }

  .my-info h3{
    font-size: 18px;
  }

  .my-price{
    bottom: 22em;
    user-select: none;
  }

  .promotion{
    min-height: 91vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .promotion-section{
    width: 100%;
    display: block;
    margin: 0;
  }
}

</style>