<template>
  <transition name="slide">
    <div class="game-detail">
      <div class="back-title">

      </div>
      <div class="game-detail-header">
        <div class="pic">
          <img width="60" height="60" src="http://app.kf989.com/uploads/KZMyCKxHRa.png">
        </div>
        <div class="desc">
          <h1 class="name">幻界之域-全民修仙巨制</h1>
          <div class="size-role-percent">
            <span class="roundbg size">123MB</span>
            <span class="roundbg role">角色</span>
            <span class="roundbg percent">比例&nbsp;1:1000</span>
          </div>
          <div class="sketch">asssaada</div>
        </div>
        <div class="recommend">荐</div>
      </div>
      <div class="scroll-x-wrapper">
        <scroll-x>
          <div class="img-detail" v-for="item in imgs">
            <img width="110" :src="item">
          </div>
        </scroll-x>
      </div>
    </div>
  </transition>
</template>

<script>
  import scrollX from 'base/scroll-x/scroll-x'
  import {getDetail} from 'api/game'

  export default {
    data(){
      return{
        imgs:[
          "http://app.kf989.com/uploads/KZMyCKxHRa.png",
          "http://app.kf989.com/uploads/KZMyCKxHRa.png",
          "http://app.kf989.com/uploads/KZMyCKxHRa.png",
          "http://app.kf989.com/uploads/KZMyCKxHRa.png",
          "http://app.kf989.com/uploads/KZMyCKxHRa.png",
          "http://app.kf989.com/uploads/KZMyCKxHRa.png",
          "http://app.kf989.com/uploads/KZMyCKxHRa.png"
        ]
      }
    },
    mounted(){
//      this.initData()
    },
    methods:{
      initData(){
        getDetail(this.$route.params.id).then((res)=>{
          console.log(res)
        })
      }
    },
    components:{
      scrollX
    }
  }
</script>

<style>
  .slide-enter-active,.slide-leave-active{
    transition:all 0.3s ease;
  }
  .slide-enter,.slide-leave-to{
    transform:translate3d(100%,0,0);
  }

  .game-detail{
    position: fixed;
    z-index:100;
    top:0;
    left:0;
    right:0;
    bottom:0;
    width:100%;
    background: #fff;
  }
  .game-detail .game-detail-header{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding:15px;
  }
  .game-detail .game-detail-header .pic{
    flex:0 0 75px;
    width:75px;
    font-size:0;
  }
  .game-detail .game-detail-header .desc{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .game-detail .game-detail-header .desc .name{
    margin-bottom:4px;
    font-size:14px;
  }
  .game-detail .game-detail-header .desc .size-role-percent{
    font-size:12px;
    line-height:16px;
  }
  .game-detail .game-detail-header .desc .size-role-percent .roundbg{
    display: inline-block;
    margin-right:3px;
    padding:1px 2px;
    border-radius:3px;
    color: #fff;
  }
  .game-detail .game-detail-header .desc .size-role-percent .size{
    background:#ff6600;
  }
  .game-detail .game-detail-header .desc .size-role-percent .role{
    background:#6fa924;
  }
  .game-detail .game-detail-header .desc .size-role-percent .percent{
    background:#ff6600;
  }
  .game-detail .game-detail-header .desc .sketch{
    font-size:12px;
    line-height:18px;
    padding-right:20px;
    color: #a4a4a4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .game-detail .game-detail-header .recommend{
    position: fixed;
    top: 15px;
    right:15px;
    width:30px;
    height:30px;
    text-align: center;
    line-height:30px;
    color: #fff;
    border-radius:15px;
    background: #fc3c5c;
  }

  .game-detail .scroll-x-wrapper{
    height: 200px;
    overflow: hidden;
    border:1px solid red;
  }
  .game-detail .scroll-x-wrapper .img-detail{
    display: inline-block;
    width:130px;
    height:200px;
    text-align: center;
  }

</style>
