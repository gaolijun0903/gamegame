<template>
  <div class="activity">
    <div class="activity-wrapper">
    	活动
    </div>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  export default {
    data(){
      return{
	    
      }
    },
    created(){
      this.initData();
    },
    methods:{
      initData(){
        
      }
    },
    beforeRouteEnter(to, from, next){
      next(true)
      window.document.location = "js://webview?network=1"
    },
    components:{
      scroll
    }
  }
</script>

<style>
.activity{
  position: fixed;
  top: 0;
  bottom: 60px;
  width: 100%;
}
  .activity-wrapper{

  }
</style>
