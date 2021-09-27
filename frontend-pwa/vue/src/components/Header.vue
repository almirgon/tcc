<template>
  <header class="myHeader">
    <div>
      <img class="myLogo" src="../assets/logo.svg" alt="promotion-logo">
    </div>
  <div class="buttons" v-if="logged && role==='ADMIN'">
    <button id="span-btn" @click="$router.push({name: 'Home'})" class=" mobile"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M12,3L6,7.58V6H4v3.11L1,11.4l1.21,1.59L4,11.62V21h16v-9.38l1.79,1.36L23,11.4L12,3z M18,19h-5v-4h-2v4H6v-8.9l6-4.58 l6,4.58V19z M10,1c0,1.66-1.34,3-3,3C6.45,4,6,4.45,6,5H4c0-1.66,1.34-3,3-3c0.55,0,1-0.45,1-1H10z"/></svg></button>
    <button @click="$router.push({name: 'Admin'})" id="span-btn" class=" mobile"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/></svg></button>
    <button @click="logOut" class=" mobile"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg></button>
  </div>
  <div class="buttons" v-if="logged && role==='CLIENT'">
    <button @click="$router.push({name: 'Home'})" id="span-btn" class=" mobile"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><rect fill="none" height="24" width="24"/><path d="M12,3L6,7.58V6H4v3.11L1,11.4l1.21,1.59L4,11.62V21h16v-9.38l1.79,1.36L23,11.4L12,3z M18,19h-5v-4h-2v4H6v-8.9l6-4.58 l6,4.58V19z M10,1c0,1.66-1.34,3-3,3C6.45,4,6,4.45,6,5H4c0-1.66,1.34-3,3-3c0.55,0,1-0.45,1-1H10z"/></svg></button>
    <button @click="$router.push({name: 'Share Promotion'})" id="span-btn" class=" mobile"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></button>
    <button @click="logOut" class=" mobile"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg></button>
  </div>
  <div v-if="!logged && !role">
    <button @click="$router.push({name: 'Login'})" class="btn">Login</button>
  </div>
  </header>
</template>

<script>
import AuthService from '../services/AuthService'
export default{
  name: "Header",
  computed:{
    logged(){
      return this.$store.state.loggedIn
    },
    role(){
      return this.$store.state.role
    }
  },
  methods:{
    logOut(){
      AuthService.logout()
      this.$store.commit('logout')
      this.$router.push({path: '/'})
    }
  }

}
</script>

<style>
.myHeader{
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  border-bottom: 1px solid #eaecef;
  align-items: center;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.buttons{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #42B983;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
}
#span-btn{
  border-right: 1px solid #CECECE;

}
.myLogo{
  max-width: 80%;
}

span{
  display: flex;
}

@media screen and (max-width: 700px){
  .myLogo{
    max-width: 80%;
  }
}
</style>