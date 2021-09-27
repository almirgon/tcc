<template>
  <section class="approval-page">
    <Back class="back-btn"/>
  <div class="approveRoom">
    <div class="intro">
      <img src="../assets/gifs/approve.gif" alt="promotion-approve" />
    </div>
    <div class="my-div" v-if="approveRoom">
      <h1>Sala de Aprovação</h1>
      <form class="my-form" @submit.prevent="approve">
        <label for="name">Nome</label>
        <input type="text" name="nome" id="name" disabled v-model="promotion.name">
        <label for="description">Descrição</label>
        <textarea type="text" name="descrição" id="description" disabled  cols="30" rows="10" v-model="promotion.description"></textarea>
        <label for="price">Preço</label>
        <input type="number" name="preço" id="price" v-model="promotion.price" disabled>
        <label for="urlLink">Link</label>
        <input type="text" name="link" id="urlLink" disabled   v-model="promotion.urlLink" >
        <label for="voucher">Cupom</label>
        <input type="text" name="cupom" id="voucher" v-model="promotion.voucher" disabled >
        <label for="soldBy">Vendido por</label>
        <input type="text" id="soldBy" name="vendido" v-model="promotion.soldBy" placeholder="Exemplo: Magalu" v-validate="'required|min:2|max:20'">
        <span>{{errors.first('vendido')}}</span>
        <label for="urlPhoto">Foto do Item</label>
        <input type="text" id="urlPhoto" name="foto" v-model="promotion.urlPhoto" placeholder="Copie o link da imagem e cole aqui" v-validate="'required|min:5'">
        <span>{{errors.first('foto')}}</span>
        <div class="my-buttons">
          <button class="btn" :disabled="errors.any()" type="submit">Aprovar</button>
        </div>
      </form>
      <button @click="dontApprove" class="btn">Não Aprovar</button>
    </div>
     <div class="my-div" v-if="loading">
      <loading></loading>
    </div>
  </div>
  </section>
</template>

<script>
import Back from '@/components/Back.vue'
import Loading from "@/components/Loading.vue"
import PromotionService from '../services/PromotionService'
export default {
  name: 'AdminApproval',
  components: {
    Back,
    'loading': Loading
  },
  data(){
    return{
      approveRoom: true,
      loading: false,
      promotion:{
        name: "",
        description: "",
        price: "",
        urlLink: "",
        voucher: "",
        soldBy: "",
        urlPhoto: ""
      }
    }
  },
  created(){
    this.loading = true
    this.approveRoom = false
    PromotionService.getPromotionById(this.$route.params.id).then((response) => {
      this.loading = false;
      this.approveRoom = true
      if(response.status === 200){
        this.promotion.name = response.data.name
        this.promotion.description = response.data.description ? response.data.description : 'Sem descrição'
        this.promotion.price = response.data.price
        this.promotion.urlLink = response.data.urlLink
        this.promotion.voucher = response.data.voucher ? response.data.voucher : 'Sem cupom'
      }
    })
  },
  methods: {
    approve(){
      this.$validator.validateAll().then(isValid =>{
         if (!isValid) {
          this.$toastr('warning', {msg: 'Ocorreu um erro na aprovação, por favor verifique os dados do formulário', title: 'Formulário incompleto', timeout: 5000,})
        }else{
          const restPromotion = {
            soldBy: this.promotion.soldBy,
            photo: this.promotion.urlPhoto
          }
          PromotionService.putPromotion(this.$route.params.id, restPromotion).then((response) => {
            if(response.status === 200){
              this.loading = false;
              this.$swal({
              icon: 'success',
              title: `Aprovada!`,
              text: `Obaa a promoção foi aprovada com sucesso e já encontra-se no feed :D`,
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true
            }).then(()=>{
              this.approveRoom = true;
              this.$router.push('/admin')
            })
            }
          }, () => {
            this.loading = false;
            this.$swal({
              icon: 'error',
              title: 'Ocorreu um erro',
              text: 'Tente novamente mais tarde',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true
            }).then(()=>{
              this.approveRoom = true;
              this.$router.push('/admin')
            })
          })
        }
      })
    },
    dontApprove(){
      this.$swal({
          title: 'Tem Certeza?',
          text: "Após reprovada, a promoção não estará mais disponivel!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#42B983',
          cancelButtonColor: '#C6EAD9',
          confirmButtonText: 'Tenho certeza',
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed){
            PromotionService.deletePromotion(this.$route.params.id).then((response) => {
              if(response.status == 200){
                this.$swal({
              icon: 'success',
              title: 'Não Aprovada',
              text: 'A promoção foi reprovada com sucesso!',
              showConfirmButton: false,
              timer: 4000,
              timerProgressBar: true
              }).then(()=>{
                this.$router.push('/admin')
              })
              }
            }, () =>{
              this.$swal({
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
  }

}
</script>

<style scoped>

.approval-page {
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

.approveRoom{
  display: flex;
  width: 100%;
}

.btn{
  max-width: 300px;
  margin: 0 auto;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

span{
  display: block;
  text-align: center;
}

input{
  margin-bottom: 1rem;
}

input:disabled:hover{
  transform: scale(1);
  cursor: not-allowed;
  user-select: none;
  border-color: gray;
}

textarea{
  margin-bottom: 1rem;
}

textarea:disabled:hover{
  transform: scale(1);
  cursor: not-allowed;
  border-color: gray;
}

button{
  margin-bottom: 1rem !important;
}

h1{
  padding: 5px;
}

.my-loading{
  margin: 0 auto;
}

@media screen and (max-width: 700px){
  .approval-page{
    width: 100%;
    flex-direction: column;
  }
  .approveRoom{
    display: block;
  }

  .intro{
    width: 100%;
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