<template>
  <section class="login-page">
    <Back class="back-btn"/>
    <div class="my-div" v-if="loginPage">
      <h1>Login</h1>
      <form class="my-form" @submit.prevent="logar">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="login.email" v-validate="'required|email'">
        <span>{{errors.first('email')}}</span>
        <label for="password">Senha</label>
        <input type="password" name="senha" id="password" v-model="login.password" v-validate="'required'">
         <span>{{errors.first('senha')}}</span>
        <button :disabled="errors.any()" class="btn">Login</button>
      </form>
      <router-link class="forgot" to="/forgot">
        <a>Esqueceu a senha? Clique Aqui</a>
      </router-link>
    </div>
    <div class="my-div" v-if="loading">
      <loading></loading>
    </div>
    <div class="my-div">
      <div class="register" v-if="!register">
        <h1>Crie sua Conta</h1>
        <button id="create-btn"  class="btn" @click="register = true">Criar Conta</button>
      </div>
       <Register v-else/>
    </div>
  </section>
</template>

<script>
import Back from '@/components/Back.vue'
import Register from "@/components/Register.vue"
import Loading from "@/components/Loading.vue"
import AuthService from '../services/AuthService'
export default {
  name: 'Login',
  components: {
    Register,
    Back,
    'loading': Loading
  },
  data(){
    return{
      register: false,
      loginPage: true,
      loading: false,
      login: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    logar(){
      this.loginPage = false
      this.loading = true
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loginPage = true
          this.loading = false
          this.$toastr('warning', {msg: 'Ocorreu um erro no login, por favor verifique os dados do formulário', title: 'Formulário incompleto', timeout: 5000})
        }else{
          let userCredentials = {
            email: this.login.email,
            password: this.login.password
          }
          AuthService.login(userCredentials).then((response) => {
            if(response.status === 200){
              this.loginPage = true
              this.loading = false
              this.$store.commit('loginSuccess', response.data)
              this.$router.push('/')
            }
          }, ()=> {
            this.loginPage = true
            this.loading = false
            this.$toastr('error', {msg: 'Ocorreu um erro', title: 'Erro', timeout: 5000,})
          })
        }
      })
      
    }
  }

}
</script>

<style scoped>

.login-page {
  padding: 5px 5px;
  display: flex;
  height: calc(100vh - 8rem);
  user-select: none;
}

.my-div{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1{
  text-align: center;
  font-size: 2rem;
  color: #42B983;
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

button{
  margin-top: 1rem !important;
}

.forgot{
  text-align: center;
  margin: 20px auto 0 auto;
  cursor: pointer;
}

.forgot a{
  color: #42B983;
}

.forgot a:hover{
  color: #42B263;
  text-decoration: underline;
}

span{
  display: block;
  text-align: center;
}


@media screen and (max-width: 767px){
  .login-page{
    width: 100%;
    flex-direction: column;
  }

  .my-div{
    width: 100%;
    height: auto;
  }

  .my-form{
    width: 80%;
  }

  #create-btn{
    margin-bottom: 2rem;
  }
  

}

@media screen and (min-width: 768px) and (max-width: 1366px){
  .login-page {
      height: 100%;
  }
}

</style>