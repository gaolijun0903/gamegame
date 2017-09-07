<template>
  <transition name="slide">
    <div class="game-detail">
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
      <grey-bar></grey-bar>
      <div class="tab-wrapper">
        <div class="detail-tab">
          <div class="detail-tab-item" :class="{'active':currentIndex===index}" v-for="(item,index) in detailTabs" @click="selectItem(index)">
            <span class="detail-tab-inner">{{item}}</span>
          </div>
        </div>
        <div class="detail-tab-container">
          <div class="detail-content" v-if="currentIndex===0">
            点评
          </div>
          <div class="detail-content" v-if="currentIndex===1">
            开服
          </div>
          <div class="detail-content" v-if="currentIndex===2">
            礼包
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import scrollX from 'base/scroll-x/scroll-x'
  import greyBar from 'base/grey-bar/grey-bar'
  import loading from 'base/loading/loading'
  import warning from 'base/warning/warning'
  import {getDetail} from 'api/game'

  export default {
    data(){
      return{
        detailTabs:[
          '点评','开服','礼包'
        ],
        currentIndex:0,
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
      },
      selectItem(index){
        this.currentIndex = index;
      }
    },
    components:{
      scrollX,
      greyBar,
      loading,
      warning
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
  }
  .game-detail .scroll-x-wrapper .img-detail{
    display: inline-block;
    width:130px;
    height:200px;
    text-align: center;
  }

  .game-detail .tab-wrapper{
    /*border:1px solid red;*/
  }
  .game-detail .tab-wrapper .detail-tab{
    display: flex;
    align-items: center;
    height:44px;
    border-bottom:1px solid #b2b2b2;
  }
  .game-detail .tab-wrapper .detail-tab .detail-tab-item{
    flex:1;
    text-align: center;
  }
  .game-detail .tab-wrapper .detail-tab .detail-tab-item.active{
    color:#00a98f;
  }
  .game-detail .tab-wrapper .detail-tab .detail-tab-item .detail-tab-inner{
    display: inline-block;
    width:75%;
    line-height:42px;
  }
  .game-detail .tab-wrapper .detail-tab .detail-tab-item.active .detail-tab-inner{
    border-bottom:2px solid #00a98f;
  }
  .game-detail .tab-wrapper .detail-tab .detail-tab-item{

  }
  .game-detail .tab-wrapper .detail-tab-container{

  }
  .game-detail .tab-wrapper .detail-tab-container .detail-content{

  }
</style>
