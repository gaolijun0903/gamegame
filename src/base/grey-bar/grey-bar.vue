<template>
  <div class="grey-bar" ref="bar"></div>
</template>

<script>
  export default {
    props:{
      height:{
        type:Number,
        default:5
      }
    },
    mounted(){
      this.$refs.bar.style.height = this.height+'px'
    }
  }
</script>

<style>
  .grey-bar{
    width:100%;
    background-color: #eaeaea;
  }

</style>

