<template>
  <section class="share-page">
    <Back class="back-btn"/>
  <div class="intro">
    <img src="../assets/gifs/share.gif" alt="promotion-share" />
  </div>
  <div class="my-div" v-if="sharePage">
    <h1>Compartilhe uma promoção conosco :)</h1>
    <form class="my-form" @submit.prevent="sendPromotion">
      <label for="name">Nome</label>
      <input type="text" id="name" name="nome" v-validate="'required|min:5|max:25'" v-model="promotion.name">
      <span>{{errors.first('nome')}}</span>
      <label for="description">Descrição</label>
      <textarea type="text" name="descrição" id="description"  cols="30" rows="10" v-validate="'min:10|max:250'" v-model="promotion.description"></textarea>
      <span>{{errors.first('descrição')}}</span>
      <label for="price">Preço</label>
      <input v-model="promotion.price" type="number" step="any" id="price" name="preço" v-validate="'required|min_value:1'">
      <span>{{errors.first('preço')}}</span>
      <label for="urlLink">Link</label>
      <input v-model="promotion.urlLink" type="text" id="urlLink" name="link" v-validate="'required'">
      <span>{{errors.first('link')}}</span>
      <label for="voucher">Cupom</label>
      <input v-model="promotion.voucher" v-validate="'min:3|max:20'" type="text" id="voucher" name="cupom" >
      <span>{{errors.first('cupom')}}</span>
      <button class="btn" :disabled="errors.any()" type="submit">Enviar</button>
    </form>
  </div>
  <div class="my-div" v-bind:style="{'background' : loading ? 'none' : '#42B983'}" v-if="loading">
      <loading></loading>
    </div>
</section>
</template>

<script>
import Back from '@/components/Back.vue'
import Loading from "@/components/Loading.vue"
import PromotionService from '../services/PromotionService'
export default {
  name: 'SharePromotion',
  components: {
    Back,
    'loading': Loading
  },
  data(){
    return{
      sharePage: true,
      loading: false,
      promotion: {
        name: "",
        description: "",
        price: "",
        urlLink: "",
        voucher: ""
      }
    }
  },
  methods: {
    sendPromotion(){
      this.sharePage = false
      this.loading = true
      this.$validator.validateAll().then(isValid =>{
         if (!isValid) {
          this.sharePage = true
          this.loading = false 
          this.$toastr('warning', {msg: 'Ocorreu um erro no cadastro, por favor verifique os dados do formulário', title: 'Formulário incompleto', timeout: 5000})
        }
        else{
          PromotionService.createPromotion(this.promotion).then((response)=>{
            if(response.status === 201){
              this.loading = false;
               this.$swal({
                icon: 'success',
                title: `Promoção cadastrada com Sucesso`,
                text: `Sua promoção será avaliada por nossos administradores, se aprovada, logo estará no feed :D`,
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                willClose: () => {
                  this.sharePage = true
                  this.$router.push({ path: '/' })
                }
              })
            }
          }, () => {
            this.$swal({
                icon: 'error',
                title: `Ocorreu um erro no cadastro`,
                text: `Tente novamente mais tarde! :(`,
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
                willClose: () => {
                  this.sharePage = true
                  this.$route.push('/')
                }
              })
          })
          
        }
      })
    }
  }

}
</script>

<style scoped>

.share-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 8rem);
  user-select: none;
}

.intro {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-div{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: min-content;
 
}

h1{
  text-align: center;
  font-size: 2rem;
  color: #42B983;
  margin-top: 1rem;
}

.text-danger{
  font-size: 12px;
  color: red;
}

.my-form{
  display: flex;
  flex-direction: column;
  width: 50%;
}

.btn{
  max-width: 300px;
  margin: 0 auto;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

input{
  margin-bottom: 1rem;
}

textarea{
  margin-bottom: 1rem;
}

button{
  margin-bottom: 1rem !important;
}

h1{
  padding: 5px;
}

back{
  display: none;
}

span{
  display: block;
  text-align: center;
}

@media screen and (max-width: 700px){
  .share-page{
    width: 100%;
    flex-direction: column;
  }

  .intro{
    width: 100%;
  }

  back{
    display: flex;
  }

  .my-div{
    width: 100%;
    height: auto;
    color: #42B983;
    background: #C6EAD9;
  }

  .my-form{
    width: 80%;
  }

  img {
    width: 100%;
    max-width: 500px;
  }
}

</style>