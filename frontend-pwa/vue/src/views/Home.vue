<template>
  <section class="home">
    <div class="list" v-if="promotions.length > 0">
      <div class="my-promotion" v-for="(promotion,index) in promotions" :key="promotion.id">
        <div class="card-info">
          <like :likes="promotion.numberLikes" :myIndex="index" :idPromotion="promotion.id" class="like" @like-promotion="likeThePromotion"></like>
        <div @click="goToPromotion(promotion.id)" class="my-img">
            <img :src="promotion.photo" alt="card-img">
        </div>
        <div class="my-price">
            <p>{{ promotion.price | toCurrency}}</p>
        </div>
          <div class="my-info">
                <h3 @click="goToPromotion(promotion.id)">{{promotion.name}}</h3>
                <div class="my-local">
                    <p>Vendido por {{promotion.soldBy}}</p>
                    <button @click="goToWebSite(promotion.urlLink)" class="my-link">Link</button>
                </div>
          </div>
        </div>
        <div class="dock">
            <div class="person">
                <avatar :customStyle="{background: '#C6EAD9', width: '40px', height: '40px'}" :username="promotion.user.firstName"></avatar>
                <div class="dataUser">
                    <p>Postado por {{promotion.user.firstName}}</p>
                    <p>{{promotion.date | dateAgo}}</p>
                </div>
            </div>
          </div>
      </div>
    </div>
    <div class="list" v-if="promotions.length === 0 && !loading">
        <div class="noPromotion">
            <h1>Sem Promoções publicadas :(</h1>
        </div>
      </div>
    <div class="list" v-if="loading">
        <loading></loading>
    </div>
  </section>
</template>

<script>

import Loading from '../components/Loading.vue'
import Like from '../components/Like.vue'
import Avatar from 'vue-avatar'
import PromotionService from '../services/PromotionService'
export default {
  name: 'Home',
  components: {
    'loading': Loading,
      Avatar,
      'like': Like
  },
  data(){
    return{
      loading: false,
      promotions: []
    }
  },
  created() {
      this.loading = true
      PromotionService.getActivesPromotions().then((response) => {
        if(response.status === 200){
          this.loading = false
          response.data.forEach((data) => {
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
    this.$router.push({name: 'Promotion', params: { id: id}})
  },
  likeThePromotion(state){
    console.log(state)
      PromotionService.like(state.id).then((response) => {
      if(response.status === 200){
        this.promotions[state.index] = response.data
      }
    })
  
    
  }

  }
  
}
</script>

<style scoped>
  .home {
  padding: 15px 5px;
}

h1{
  text-align: center;
  font-size: 2rem;
  color: #42B983;
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
.my-promotion {
  padding: 10px;
  user-select: none;
}
.my-img{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 400px;
  padding: 1rem;
  margin: 0 auto;
  cursor: pointer;
}
img{
  max-width: 100%;
  max-height: 100%;
}
.card-info {
  position: relative;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 1rem;
  box-shadow: 0 1px 2px 0 rgba(60,64,67,0.302),0 2px 6px 2px rgba(60,64,67,0.149);
}
.my-promotion{
  transition: all 0.25s;
}
.my-promotion:hover{
  transform: scale(1.025);
}
.my-info{
  width: 300px;
  min-width: 100%;
  height: 70px;
}
.my-info h3{
  text-align: start;
  word-break: break-all;
  font-size: 20px;
  margin-bottom: 0px;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
  color: #666666;
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
.my-price{
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 6em;
  user-select: none;
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
  background-color: #42B263;
  justify-content: space-between;
  user-select: none;
}
.my-local{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.my-link{
  background: none;
  color: #42B983;
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
.person{
  display: flex;
  align-items: center;
}
.dataUser{
  margin-left: 0.5rem;
}
img{
  max-width: 100%;;
}
.dataUser p:nth-child(1){
  color: whitesmoke;
}
.dataUser p:nth-child(2){
  font-size: 12px;
  color: whitesmoke;
  text-align: start;
}
@media screen and (max-width: 700px) {
  .my-promotion {
    width: 100%;
  }
  .my-img{
    width: auto;
    height: 160px;
    padding: 0;
  }
  .card-info{
    padding: 0.5rem;
    display: flex;
  }
  .my-price{
    bottom: 1em;
  }
  .my-info{
    width: 100%;
    min-width: inherit;
    margin-top: 30px;
  }
  .my-info h3{
    font-size: 16px;
  }
  .dataUser p:nth-child(1){
    font-size: 12px;
    font-weight: 500;
  }
  .dock{
    padding: 0.5rem;
  }
  .like{
    position: absolute;
    right: 0;
    margin-right: 1rem;
    top: 0.6em;
  }
  .my-local p {
    font-size: 10px;
  }
  .people p{
    display: none;
  }
}
</style>