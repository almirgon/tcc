<template>
  <section class="error-page">
    <div class="my-gif">
      <img src="../assets/gifs/404.gif" alt="promotion-error404" />
      <h1>Página não encontrada</h1>
      <router-link class="btn" to="/">Ir para Home</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "Error404"

}
</script>

<style scoped>

  .error-page {
    width: 100%;
    user-select: none;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }

  h1{
    text-align: center;
    font-size: 2rem;
    color: #42B983;
    margin-bottom: 1rem;
  }

  img{
    width: 100%;
  }

  button{
    margin: 0 auto;
  }

  @media screen and (max-width: 700px){

  }


</style>