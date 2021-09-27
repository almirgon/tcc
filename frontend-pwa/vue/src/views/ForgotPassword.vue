<template>
<section class="forgot-page">
  <Back class="back-btn"/>
  <div class="intro">
    <img src="../assets/gifs/forgot.gif" alt="promotion-forgot" />
  </div>
  <form class="forgot">
    <div class="title">
      <h2>Funcionalidade em Desenvolvimento</h2>
    </div>
  </form>
</section>
  
</template>

<script>
import Back from '@/components/Back.vue'
export default {
  name: "ForgotPassword",
   components: {
    Back
  },

}
</script>

<style scoped>

.forgot-page {
  width: 100%;
  display: flex;
  height: 100vh;
}
.intro {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #42B983;
  background: #C6EAD9;
  height: 100vh;
}

.title {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.title h2 {
  color: #42B983;
  text-align: center;
}

.title h5 {
  font-size: 16px;
  color: #42B983;
  opacity: 60%;
  text-align: center;
}

input {
  width: 300px;
}

.send {
  margin-top: 1rem;
  color: #42B983;
}

@media (max-width: 800px) {
  .forgot-page {
    flex-direction: column;
    height: auto;
  }
  .intro {
    width: 100%;
  }
  .forgot {
    width: 100%;
    margin-top: 0px;
    height: 45vh;
  }
  img {
    width: 100%;
    max-width: 500px;
  }
}


</style>