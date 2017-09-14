<template>
  <transition name="slide">
  	
    <scroll class="game-detail"
            :data="datalist"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scrollPos"
    >
      <div>
      	<div class="back-title">
			    <div class="back" @click="back">
			      <i class="iconfont icon-fanhui"></i>
			    </div>
			    <div class="title">{{detailObj.name}}</div>
		    </div>
        <div class="game-detail-header">
          <div class="pic">
            <img width="60" height="60" :src="detailObj.ioc_path" :onerror="defaultImg">
          </div>
          <div class="desc">
            <h1 class="name">{{detailObj.name}}</h1>
            <div class="size-role-percent">
             <!-- <span class="roundbg size">{{detailObj.apksize}}MB</span>-->
              <span class="roundbg role">{{detailObj.typename}}</span>
              <span class="roundbg percent">充值比例&nbsp;1:{{detailObj.bl}}</span>
            </div>
            <div class="sketch">{{detailObj.apksize}}MB</div>
          </div>
          <div class="recommend" v-show="detailObj.tj==='1'">荐</div>
        </div>
        <div class="scroll-x-wrapper" v-show="imgs.length>0">
          <scroll-x ref="scrollx" :data="imgs">
            <div class="img-detail" v-for="item in imgs">
              <img width="110" :src="item">
            </div>
          </scroll-x>
        </div>
        <grey-bar></grey-bar>
        <div>
          <div class="detail-tab">
            <div class="detail-tab-item" :class="{'active':currentIndex===index}" v-for="(item,index) in detailTabs" @click="selectItem(index)">
              <span class="detail-tab-inner">{{item}}</span>
            </div>
          </div>
          <div class="detail-tab-container">
            <div class="detail-content" v-if="currentIndex===0">
            	<p>{{detailObj.detailed}}</p>
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
      <div class="detail-tab fixed-top" ref="fixedTop" v-show="showfixedtop">
        <div class="detail-tab-item" :class="{'active':currentIndex===index}" v-for="(item,index) in detailTabs" @click="selectItem(index)">
          <span class="detail-tab-inner">{{item}}</span>
        </div>
      </div>
      <div class="download-btn-wrapper">
        <div class="download-btn" @click="download">下载</div>
      </div>
    </scroll>
  </transition>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import scrollX from 'base/scroll-x/scroll-x'
  import greyBar from 'base/grey-bar/grey-bar'
  import loading from 'base/loading/loading'
  import warning from 'base/warning/warning'
  import {getDetail} from 'api/game'
  import {cloneObj, baseUrl} from "common/js/util"

  export default {
    data(){
      return{
        detailObj:{
          ioc_path: "static/img/error.png"
        },
        imgs:[],
        datalist:[],
        detailTabs:['福利'/*,'开服','礼包'*/],
        currentIndex:0,
        probeType:3,
        listenScroll:true,
        showfixedtop:false,
        defaultImg: 'this.src='+'"static/img/error.png"'
      }
    },
    created(){
//      console.log('game-detail-created')
      this.initData()
    },
    methods:{
      initData(){
        getDetail(this.$route.params.id).then((res)=>{
//          console.log(res);
          this.imgs = this.normalizeImage(res.img);
          this.$nextTick(()=>{
            this.$refs.scrollx.initScrollX();
          })
          this.detailObj = cloneObj(res);
          this.detailObj.ioc_path = baseUrl() + res.ioc_path;

        }).catch((err)=>{
          console.log('detail-err')
         // this.detailObj.ioc_path = "static/img/error.png"
        })
      },
      back(){
        this.$router.back();
      },
      normalizeImage(list){
        var newList = list.map((item)=>{
          return baseUrl() + item;
        })
        return newList
      },
      selectItem(index){
        this.currentIndex = index;
      },
      scrollPos(pos){
        //console.log(pos.y)(295+136)
        if(Math.abs(pos.y)>=331){
          this.showfixedtop = true;
        }else{
          this.showfixedtop = false;
        }
      },
      imgErr(){

      },
      download(){
        var downurl = baseUrl()+"/download/"+this.detailObj.apkname+".apk";
        console.log(downurl);
        window.location.href = downurl;
      }
    },
    components:{
      scroll,
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
  .back-title{
    height:36px;
    background: #12cdb0;
  }
  .back-title .back{
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    color:#FFFFFF;
  }
  
  .back-title .title{
    line-height: 36px;
    text-align: center;
    color:#FFFFFF;
  }
  .back .iconfont.icon-fanhui{
    display: block;
    font-size: 22px;
    padding: 0px 6px;
    line-height: 36px;
    color:#FFFFFF;
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
    line-height:20px;
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

  .game-detail .detail-tab{
    display: flex;
    align-items: center;
    height:44px;
    border-bottom:1px solid #b2b2b2;
  }
  .game-detail .fixed-top{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    background:#fff;
  }
  .game-detail .detail-tab .detail-tab-item{
    flex:1;
    text-align: center;
  }
  .game-detail .detail-tab .detail-tab-item.active{
    color:#00a98f;
  }
  .game-detail .detail-tab .detail-tab-item .detail-tab-inner{
    display: inline-block;
    width:75%;
    line-height:42px;
  }
  .game-detail .detail-tab .detail-tab-item.active .detail-tab-inner{
    border-bottom:2px solid #00a98f;
  }
  .game-detail .detail-tab-container{
    padding:20px 15px 0;
    height: 800px;
    /*background: #ccc;*/
  }
  .game-detail .detail-tab-container .detail-content{

  }

  .game-detail  .download-btn-wrapper{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    /*background: #eaeaea;*/
  }
  .game-detail  .download-btn-wrapper .download-btn{
    margin:6px auto;
    width: 95%;
    height: 45px;
    font-size: 22px;
    line-height: 45px;
    text-align: center;
    background: #00a98f;
    color: #fff;
    border-radius:5px;
  }
</style>
