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
          <div class="recommend" v-show="detailObj.tj==='1'" @click="openurl" >荐</div>
        </div>
        <div class="scroll-x-wrapper" v-show="imgs.length>0">
          <scroll-x ref="scrollx" :data="imgs">
            <div class="img-detail" v-for="(item, index) in imgs" @click="toPhotoView(index, imgs)">
              <img width="110" :src="item">
            </div>
          </scroll-x>
        </div>
        <grey-bar></grey-bar>
        <div class="detail-tab-wrapper" :style="{minHeight: detailMinHeight}">
          <div class="detail-tab">
            <div class="detail-tab-item" :class="{'active':currentIndex===index}" v-for="(item,index) in detailTabs" @click="selectItem(index)">
              <span class="detail-tab-inner">{{item}}</span>
            </div>
          </div>
          <div class="detail-tab-container" >
            <div class="detail-content" v-show="currentIndex===0"><!--介绍-->
								<div class="jieshao" v-html="detailObj.sketch"></div>
            </div>
            <div class="detail-content" v-show="currentIndex===1"><!--福利-->
              	<div class="fuli" v-html="detailObj.detailed"></div>
            </div>
            <div class="detail-content" v-show="currentIndex===2"><!--开服-->
            	<div v-show="detailObj.arealist.length">
              	<div class="detail-content-kaifu border1px" v-for="item in detailObj.arealist">
              		<div class="pic">
				            <img width="60" height="60" :src="detailObj.ioc_path" :onerror="defaultImg">
				          </div>
				          <div class="desc">
				          	<h1 class="kaifu-name">{{detailObj.name}} <span class="kaifu-name-inner" v-html="item.name"></span></h1>
				          	<div class="kaifu-time">
				          		{{formatLeftTime(item.openingtime,detailObj.current_time)}}
				          	</div>
				          </div>
				          <div class="state">{{formatKaifuState(item.openingtime,detailObj.current_time)}} </div>
              	</div>
              </div>
            </div>
            <div class="detail-content" v-show="currentIndex===3"><!--礼包-->
              <div v-show="detailObj.giftslist.length">	
              	<div class="detail-content-libao" v-for="(item,index) in detailObj.giftslist">
              		<div class="libao-item libao-item-pos  border1px" @click="toggleShowlbDetail(index)">
              			<div class="pic">
					            <img width="60" height="60" :src="detailObj.ioc_path" :onerror="defaultImg">
					          </div>
					          <div class="desc">
					          	<h1 class="name">{{item.name}} </h1>
					          	<div class="libao-progress">
					          		<div class="progress-bar"><span class="progress-bar-inner" :style="{width:item.number/item.total*100+'%'}"></span></div>
					          		<div class="libao-progress-num">（剩余{{100-item.number/item.total*100}}%）</div>
					          	</div>
					          	<div class="libaoshow-btn"> 	
					          		<span class="lbbtn-text"> 查看礼包详情  </span>
					          		<span class="iconfont-wrapper">
						          		<i class="iconfont icon-unfold" :class="{'icon-fold':currentlbDetailIdx==index}"></i>
						          	</span>
					          	</div>
					          </div>
					          <div class="libao-getbtn-wrapper"> <div class="lbgetbtn" @click.stop="getLibao(item.id)">领取</div> </div>
              		</div>
              		<div class="libao-item"><!--站位-->
              			<div class="pic">
					            <img width="60" height="60" :src="detailObj.ioc_path" :onerror="defaultImg">
					          </div>
              		</div>
              		<transition name="slidedown">
		              	<div class="libao-detail border1px" v-show="currentlbDetailIdx==index" v-html="item.content">
		              	</div>	
	              	</transition>
              	</div>
              </div>
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
          ioc_path: "static/img/error.png",
          kaifu_time:null
        },
        detailMinHeight:0,
      	currentlbDetailIdx:0,
        imgs:[],
        datalist:[],
        detailTabs:['介绍','福利','开服','礼包'],
        currentIndex:0,
        probeType:3,
        listenScroll:true,
        showfixedtop:false,
        defaultImg: 'this.src='+'"static/img/error.png"'
      }
    },
    created(){
    	this.detailMinHeight= window.screen.height+'px';
    	console.log( window.screen.height)
//      console.log('game-detail-created')
			this.channel=getChannel();
      this.initData()
    },
    mounted(){
    	
    },
    methods:{
      initData(){
        getDetail(this.$route.params.id,this.channel).then((res)=>{
					 console.log(res);
					this.showLoading = false;
          this.imgs = this.normalizeImage(res.img);
          this.$nextTick(()=>{
            this.$refs.scrollx.initScrollX();
            this.$refs.scroll.refresh();
            
          })
          this.detailObj = cloneObj(res);
          this.detailObj.ioc_path = baseUrl() + res.ioc_path;
          this.currentlbDetailIdx = this.detailObj.giftslist.length-1;//默认礼包的最后一个展开
        }).catch((err)=>{
          console.log('detail-err123')
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
      formatKaifuState(opentime,now){
      	return opentime-now<=0 ? "已开服" : "未开服";
      },
      formatLeftTime(opentime,now){
      	var strTail = "",
      			leftTimeStr ="",
      			leftTime = opentime-now;
      	if(leftTime<=0){
      		leftTime = ((now-opentime)/60).toFixed(0) ;  //已过分钟数
      		strTail = "前";
      	}else{
      		leftTime = ((opentime-now)/60).toFixed(0) ;  //剩余分钟数
      		strTail = "后";
      	}
      	
      	if(leftTime<1){ 
      		leftTimeStr = "1分钟";
      	}else if(leftTime>=1 && leftTime<60){
      		leftTimeStr = leftTime+"分钟";
      	}else if(leftTime>=60 && leftTime<60*24){
      		leftTimeStr = Math.floor(leftTime/60)+"小时";
      	}else if(leftTime>=60*24 && leftTime<60*24*7){
      		leftTimeStr = Math.floor(leftTime/60/24)+"天";
      	}else if(leftTime>=60*24*7 ){
      		leftTimeStr = Math.floor(leftTime/60/24/7)+"周";
      	}
      	
      	return this.formatDate(opentime) +"("+ leftTimeStr+strTail +")";
      },
      formatDate(opentime) { 
      	var d = new Date(opentime*1000);
				var month=d.getMonth()+1; 
				var date=d.getDate(); 
				var hour=d.getHours(); 
				var minute=d.getMinutes(); 
				return this.padZero(month)+"-"+this.padZero(date)+" "+this.padZero(hour)+":"+this.padZero(minute); 
			},
			padZero(num){
				return num<10? "0"+num :num;
			},
			toggleShowlbDetail(index){
				this.currentlbDetailIdx = index;
			},
			getLibao(id){
				alert("礼包"+id)
			},
      selectItem(index){
        this.currentIndex = index;
       /* this.showfixedtop = false;*/
				this.$nextTick(()=>{
					this.$refs.scroll.refresh();
				})
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
		  openurl(){
		  		console.log('11122222');
		  		window.myObj.openQQ('28830963'); 
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
  .slidedown-enter-active{
    transition:all 0.5s ease;
  }
  .slidedown-enter,.slidedown-leave-to{
    transform:translate3d(0,-100%,0);
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
  .game-detail .game-detail-header, .game-detail .detail-content-kaifu, .game-detail .detail-content-libao .libao-item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding:15px;
  }
  .game-detail .pic{
    flex:0 0 75px;
    width:75px;
    font-size:0;
  }
  .game-detail .desc{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .game-detail .desc .name{
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
	.game-detail .detail-tab-wrapper{ /*TODO*/
		/*min-height: 600px;*/
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
    width:100%;
    line-height:43px;
  }
  .game-detail .detail-tab .detail-tab-item.active .detail-tab-inner{
    border-bottom:2px solid #00a98f;
  }
  .game-detail .detail-tab-container{
    height: 100%;
  }
  .game-detail .detail-tab-container .detail-content{ 
		padding-bottom:60px;
  }
 
  .game-detail .detail-content-kaifu .desc .kaifu-name{
    font-size: 16px;
  }
  .game-detail .detail-content-kaifu .desc .kaifu-name-inner{
    font-size: 14px;
    color: #aaa;
  }
	.game-detail .detail-content-kaifu .desc .kaifu-time{
  	margin-top: 9px;
    font-size: 14px;
    color: #aaa;
  }
  .game-detail .detail-content-kaifu .state{
  	flex:0 0 75px;
    width:75px;
    text-align: center;
  }
  .game-detail .detail-content-libao{
  	padding-bottom: 1px;
  }   
  .game-detail .detail-content-libao .libao-item-pos{
  	position: absolute;
  	width: 100%;
  	z-index: 1;
  	background:#FFFFFF;
  }
  .game-detail .detail-content-libao .libao-progress {
  	display: flex;
  }
  .game-detail .detail-content-libao .progress-bar{
  	flex: 1;  margin-top: 4px;
  	width: 60%;
  	height: 5px;
  	background: #CCCCCC;
  }
  .game-detail .detail-content-libao .progress-bar-inner{
  	display: block;
  	height: 100%;
  	background: #5CA79E;
  }
  .game-detail .detail-content-libao .libao-progress .libao-progress-num{
  	flex:0 0 100px;
    width:100px;
  	font-size: 10px;
  }
  .game-detail .detail-content-libao .libaoshow-btn{
  	margin-top: 5px;
  	font-size: 10px;
  }
  .game-detail .detail-content-libao .libaoshow-btn .lbbtn-text{
  	display: inline-block;
  	vertical-align: middle;
  }
  .game-detail .detail-content-libao .libaoshow-btn .iconfont-wrapper{
  	display: inline-block;
  	vertical-align: middle;
  }
  .game-detail .detail-content-libao .libao-getbtn-wrapper {
  	flex:0 0 75px;
    width:75px;
  	font-size: 10px;
  }
  .game-detail .detail-content-libao .libao-getbtn-wrapper .lbgetbtn{
  	font-size: 12px;
    margin-top: 5px;
    text-align: center;
    background: #FE3838;
    color: #FFFFFF;
    height: 30px;
    line-height: 30px;
  }
  .game-detail .detail-content-libao .libao-detail{
  	padding: 10px 15px;
  	/*height: 60px;*/   /*TODO*/
  	font-size: 10px;
  	line-height: 17px;
  }
  
  .game-detail  .download-btn-wrapper{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #fff;
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
  .jieshao{
  	padding: 20px 10px 0;
  	font-size: 12px;
	  line-height:2;
	  color:#999;
  }
  .fuli{
  	padding: 20px 10px 0;
  }
  .game-detail .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
