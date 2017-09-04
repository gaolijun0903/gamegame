<template>
  <transition name="fade">
    <div class="warning" v-show="showFlag" @click.stop="hide">
      网络在开小差，请检查<span class="refresh" ref="refresh" @click="refresh">刷新</span>
    </div>
  </transition>
</template>

<script>
  export default {
    props:{
      delay:{
        type:Number,
        default:2000
      }
    },
    data(){
      return {
        showFlag:false,
        page:false
      }
    },
    methods:{
      show(){
        this.showFlag = true;
      },
      hide(){
        this.showFlag = false;
      },
      resetPage(page){
        //用来区分刷新的是第一次加载(false)还是分页加载(true)
        this.page = page
      },
      refresh(){
        this.$emit('refresh',this.page);
        this.hide();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .warning{
    position: fixed;
    bottom:35%;
    left:15%;
    width:70%;
    background:rgba(0,0,0,0.2);
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    border-radius: 15px;
  }
  .warning .refresh{
    text-decoration:underline;
    color:#00a98f;
  }
  .warning.drop-enter-active, .warning.drop-leave-active{
    transition: all .3s;
    opacity:1;
  }
  .warning.drop-enter, .warning.drop-leave-to{
    opacity:0
  }
</style>
