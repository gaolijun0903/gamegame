<template>
  <transition name="slide">
    <scroll ref="scroll"
    	class="game-detail"
            :data="datalist"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scrollPos">
      <div v-show="imgs.length>0">
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
            <div class="img-detail" v-for="(item, index) in imgs" @click="toPhotoView(index, imgs)">
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
            	<p v-html="detailObj.detailed"></p>
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
      <div class="download-btn-wrapper" v-if="imgs.length>0">
        <div class="download-btn" @click="download">下载</div>
      </div>
      <div class="loading-container" v-show="showLoading">
        <loading></loading>
      </div>
		<div class="fetch-failed" v-if="!showLoading && imgs.length<=0">
			<div class="wifi">
			    <i>wifi</i>
			  </div>
			  <div class="detail-info">
			  	<span class="text">加载失败，请检查网络后重试~</span>
			  </div>
			  <div class="reset-btn">
			  	<span class="text" @click="resetfetch()">重试</span>
			  </div>
		</div>
    </scroll>
  </transition>
</template>

<script>
	import loading from 'base/loading/loading'
  import scroll from 'base/scroll/scroll'
  import scrollX from 'base/scroll-x/scroll-x'
  import greyBar from 'base/grey-bar/grey-bar'
  import warning from 'base/warning/warning'
  import {getDetail} from 'api/game'
  import {cloneObj, baseUrl} from "common/js/util"
  import {getChannel} from 'api/channel'
  export default {
    data(){
      return{
	    channel:"",
      	showLoading: true,
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
		this.channel=getChannel();
        this.initData()
    },
    methods:{
      initData(){
	    
        getDetail(this.$route.params.id,this.channel).then((res)=>{
					// console.log(res);
					this.showLoading = false;
          this.imgs = this.normalizeImage(res.img);
          this.$nextTick(()=>{
            this.$refs.scrollx.initScrollX();
            this.$refs.scroll.refresh();
          })
          this.detailObj = cloneObj(res);
          this.detailObj.ioc_path = baseUrl() + res.ioc_path;

        }).catch((err)=>{
          console.log('detail-err')
          this.showLoading = false;
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
      toPhotoView(index, imgs){
      	console.log('item->'+index);
      	console.log(imgs)
      	if(window.myObj){
      		imgs = window.JSON.stringify(imgs);
      		window.myObj.openImage(index, imgs);
      	}
      },
      download(){
        // 检测是否有网络
        var isNet = true;
      	try{
      		// 检测是否有网络
	      	isNet = myObj.checknet('检测是否有网络');
      	}catch(error){}
      	if(isNet){
      		var downurl = this.detailObj.apkname;
        	window.location.href = downurl;      		
      	}
      },
      resetfetch(){
      	this.showLoading = true;
      	this.initData();
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
  .fetch-failed {
  	position: absolute;
  	width: 100%;
  	top: 40%;
  	text-align: center;
  }
  .fetch-failed .wifi{
  	color: #999999;
  }
  
  .fetch-failed .detail-info{
  	font-size: 15px;
  	line-height: 15px;
  	color: #999999;
  	margin-top: 25px;
  }
  .fetch-failed .reset-btn {
  	margin-top: 25px;
  	font-size: 13px;
  	color: #999999;
  }
  .fetch-failed .reset-btn .text{
  	display: inline-block;
  	width: 58px;
  	height: 33px;
  	line-height: 33px;
  	box-sizing: border-box;
  	border: 1px solid #cccccc;
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
    padding:20px 15px 60px;
    height: 100%;
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
  
  .game-detail .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
