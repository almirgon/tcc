<template>
<section class="home">
  <div class="list" v-if="promotions.length > 0">
    <div class="board" v-for="promotion in promotions" :key="promotion.id">
      <div class="card-info" @click="goToPromotion(promotion.id)">
      <div class="my-price">
          <p>{{promotion.price | toCurrency}}</p>
      </div>
        <div class="info-board">
              <h3>{{promotion.name}}</h3>
              <div class="person">
                <div class="data">
                    <p>Enviado por {{promotion.user.firstName}}</p>
                    <p>{{promotion.date | dateAgo}}</p>
                </div>
            </div>
        </div>
      </div>
      <div class="dock">
        <div class="my-local">
          <button class="btn" @click="goToWebSite(promotion.urlLink)">Verificar Promoção</button>
      </div>
        </div>
    </div>
  </div>

  <div class="list" v-if="promotions.length === 0 && loading === false">
    <div class="noPromotion">
      <h1 id="my-h1">Sem Promoções Pendentes</h1>
    </div>
  </div>
  <div class="list" v-if="loading">
    <loading></loading>
  </div>
</section>
</template>

<script>
import PromotionService from '../services/PromotionService'
export default {
  name: 'AdminPage',
  data(){
    return{
      loading: false,
      promotions: []
    }
  },
  created(){
    this.loading = true;
      PromotionService.getPendingsPromotions().then((response) => {
        if(response.status === 200){
          this.loading = false;
          response.data.forEach((data)=>{
            this.promotions.push(data)
          })
        }
      })
  },
  methods: {
     goToWebSite(urlLink){
    return window.open(urlLink, '_blank') 
  },
  goToPromotion(id){
    this.$router.push({name: 'Admin Approval', params: { id: id}})
  }
  }

}
</script>

<style scoped>

.home {
  padding: 5px 5px;
}

.createRetrospective {
  border: none;
  color: #fff;
  background: #3277db;
  border-radius: 100px;
  width: 36px;
  height: 36px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.board {
  padding: 10px;
  user-select: none;
}

.card-info {
  position: relative;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  min-height: 160px;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 2px 6px 2px rgba(60,64,67,0.149);
}

.board{
  transition: all 0.25s;
}

.board:hover{
  transform: scale(1.025);
}

.info-board{
  width: 300px;
  min-width: 100%;
  height: 70px;
  text-align: center;
}

.info-board h3{
  word-break: break-all;
  font-size: 20px;
  margin-bottom: 0px;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  color: #666666;
 
}

.info-board h3:hover{
  text-decoration: underline;
}

.info-board p{
  font-size: 15px;
  color: gray;
  margin-bottom: 0px;
  max-width: 100%;
  max-height: 100%;
 
}
.my-price{
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: auto;
  bottom: 1em;
  right: 0;
  width: 40%;
  border-bottom-left-radius: 10px;
  box-shadow: 0 0.2px 2.5px 0 rgba(60,64,67,0.302),0 1px 1.5px 0.5px rgba(60,64,67,0.149);
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

.dock {
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 2px 6px 2px rgba(60,64,67,0.149);
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: #C6EAD9;
  justify-content: space-between;
  user-select: none;
}

.my-local{
  margin: 0 auto;
}

.my-link{
  background: none;
  color: pink;
  padding: 5px 20px;
  border-radius: 5px;
  border: 1px solid #CECECE;
  cursor: pointer;
  font-size: smaller;
  transition: all 0.3s;
}

.my-link:hover{
  background-color: #CECECE;
  color: #42B983;
}

.people{
  display: flex;
  align-items: center;
}

.people p {
  margin-right: 0.3rem;
}


.data{
  margin-left: 0.3rem;

}

.data p:nth-child(1){
  color: #666666;;
}

.data p:nth-child(2){
  font-size: 12px;
  color: #666666;
  
}

#my-h1{
  text-align: center;
  font-size: 2rem;
  color: #42B983;
}

@media screen and (max-width: 700px) {
  .board {
    width: 100%;
  }
  .card-info{
    min-height: 130px;
    padding: 0.5rem;
    display: flex;
  }
 

  .info-board{
    width: 100%;
    min-width: inherit;
    margin-top: 30px;
    
  }

  .info-board h3{
    font-size: 16px;
  }

  .data p:nth-child(1){
    font-size: 12px;
    
    font-weight: 500;
  }

  .dock{
    padding: 0.5rem;
  }

  .people p{
    display: none;
  }

  .my-price{
    top: 0;
    bottom: auto;
  }
}

</style>