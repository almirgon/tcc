<template>
  <div id="app">
    <my-header></my-header>
    <main>
      <transition mode="out-in">
        <router-view/>
      </transition>
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    'my-header': Header
  }
  
}
</script>

<style>
@font-face {
  font-family: Avenir-Black;
  src: local("Avenir-Black"), url('assets/fonts/Avenir-Black.otf') format("opentype");
}

@font-face {
  font-family: Avenir-Book;
  src: local("Avenir-Book"), url("assets/fonts/Avenir-Book.otf") format("opentype");
}

@font-face {
  font-family: Avenir-Roman;
  src:local("Avenir-Roman"), url("assets/fonts/Avenir-Roman.otf") format("opentype");
}

body {
  font-family: "Avenir-Roman", Avenir, Helvetica;
  text-align: center;
  width: 100%;
}

body, ul, li  h1, h2, p{
  margin: 0px;
  padding: 0px;
}

ul{
  list-style: none;
}

a{
  text-decoration: none;
}

img{
  max-width: 100%;
  display: block;
}

span{
  color: black;
}

h1{
  user-select: none;
}

.back-btn{
  display: none;
}

.btn{
  display: block;
  padding: 10px 30px;
  background: #42B983;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.btn:hover{
  color: #fff;
  background: #42B263;
  transform: scale(1.05);
}

.btn:disabled{
  transform: none;
  opacity: 70%;
  cursor: auto;
}

.btn:disabled:hover{
  background: #42B263;
}

input, textarea{
  border-radius: 4px;
  background: #42B983;
  color: white;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  border: none;
  margin-bottom: 15px;
}

input:hover, input:focus, textarea:hover, textarea:focus{
  outline: none;
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: #42B983;
}

label{
  margin-top: .5rem;
  margin-bottom: .5rem;
}

.mobile{
  padding: 4px 5px;
  border-radius: 0px;
  box-shadow: 0 0px 0px rgba(30, 60, 90, 0.2);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.mobile:hover{
  background: #42C999;
  border-radius: 4px;
}



.v-enter, .v-leave-to{
  opacity: 0;
}

.v-enter{
  transform: translate3d(0, -20px, 0);
}

.v-leave-to{
  transform: translate3d(0, 20px, 0);
}

.v-enter-active, .v-leave-action{
  transition: all 0.5s;
}

@media screen and (max-width: 700px){
.back-btn{
  display: flex;
}
}

</style>
