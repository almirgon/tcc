<template>
  <div class="my-like">
  <span v-bind:style="{'cursor' : logged ? 'pointer' : 'auto'}" @click="logged && likeIt()" >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </span>
      <p>{{numberLikes}}</p>
</div>
</template>

<script>
export default {
  name: 'Like',
  props: ['likes', 'idPromotion', 'myIndex'],
  data(){
    return{
      numberLikes: this.likes
    }
  },
  computed: {
    logged(){
      return this.$store.state.loggedIn;
    }
  },
  methods: {
    likeIt(){
      if(this.logged){
        this.$emit('like-promotion', {id: this.idPromotion, index: this.myIndex})
      }
    }
  }
}
</script>

<style scoped>
.my-like{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 7em;
}

.my-like span{
  cursor: pointer;
  font-size: 20px;
  margin-right: 0.2rem;
}

.my-like p {
  font-size: 14px;
}

</style>