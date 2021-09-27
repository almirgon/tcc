<template>
  <div class="back">
  <span id="my-span" @click="$router.go(-1)">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#42B983"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>
  </span>
</div>
</template>

<script>
export default {
  name: 'Back'

}
</script>

<style scoped>
  .back{
    margin-top: 1rem;
  }
  #my-span{
    cursor: pointer;
  }

</style>