<template>
  <div class="register">
    <h1>Cadastro</h1>
    <form class="my-form" @submit.prevent="registerUser">
      <label for="firstName">Nome</label>
      <input type="text" name="nome" id="firstName" v-model="register.firstName" v-validate="'required|min:2|max:20'">
      <span>{{errors.first('nome')}}</span>
      <label for="lastName">Sobrenome</label>
      <input type="text" name="sobrenome" id="lastName" v-model="register.lastName" v-validate="'required|min:2|max:20'">
      <span>{{errors.first('sobrenome')}}</span>
      <label for="emailRegister">Email</label>
      <input  type="email" name="email" id="emailRegister" v-model="register.email" v-validate="'required|email'">
      <span>{{errors.first('email')}}</span>
      <label for="passwordRegister">Senha</label>
      <input  type="password" name="senha" id="passwordRegister" v-model="register.password" v-validate="'required|min:5|max:20'" ref="password">
      <span>{{errors.first('senha')}}</span>
      <label for="confirmPassword">Confirmar a senha</label>
      <input type="password" name="confirmar senha" id="confirmPassword" v-validate="'required|confirmed:password'"  v-model="register.confirmPassword" data-vv-as="confirmar senha">
      <span>{{errors.first('confirmar senha')}}</span>
      <button :disabled="errors.any()" class="btn" type="submit">Cadastrar</button>
    </form>
</div>
</template>

<script>
import UserService from '../services/UserService'
import AuthService from '../services/AuthService'
export default {
  name: "Register",
  data(){
    return{
      register: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    }
  },
  methods: {
    registerUser(){
      this.$validator.validateAll().then(isValid =>{
         if (!isValid) {
          this.$toastr('warning', {msg: 'Ocorreu um erro no cadastro, por favor verifique os dados do formulário', title: 'Formulário incompleto', timeout: 5000})
        }
        else{
          UserService.createUser({
            firstName: this.register.firstName,
            lastName: this.register.lastName,
            email: this.register.email,
            password: this.register.password
          }).then((response)=>{
            if(response.status === 201){
              this.$swal({
                icon: 'success',
                title: `Cadastro Realizado com Sucesso`,
                text: `Olá ${response.data.firstName}! Seja bem vindo ao Promotion`,
                showConfirmButton: true,
                confirmButtonColor: '#42B983',
                confirmButtonText: "Vamos lá :P",
              }).then((result) => {
                if (result.isConfirmed){
                  let userCredentials = {
                    email: this.register.email,
                    password: this.register.password
                  }
                  AuthService.login(userCredentials).then((response) => {
                    if(response.status === 200){
                      this.$store.commit('loginSuccess', response.data)
                      this.$router.push('/')
                    }
                  })
                }
              })
            }
            else{
              this.$swal({
                icon: 'error',
                title: `Ocorreu um erro no seu cadastro`,
                text: `Tente novamente mais tarde!`,
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
              })
            }
          })
        }
      })
    }
  }

}
</script>

<style scoped>

.register{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

h1{
  text-align: center;
  font-size: 2rem;
  color: #42B983;
  margin-top: 1rem;
}

.my-form{
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
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
  margin-bottom: 1rem !important;
}

span{
  display: block;
  text-align: center;
}

@media screen and (max-width: 700px){
  .my-form{
    width: 80%;
  }

}

</style>