<template>
  <div class="rank">
    <div class="rank-wrapper">
排行
    </div>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import {getRankList} from 'api/rank'
  import {getChannel} from 'api/channel'
  export default {
    data(){
      return{
	    channel:"",
        rankList:[]
      }
    },
    created(){
      this.initData();
    },
    methods:{
      initData(){
        getRankList(getChannel()).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
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
.rank{
  position: fixed;
  top: 0;
  bottom: 60px;
  width: 100%;
}
  .rank-wrapper{

  }
</style>
