<template>
  <div class="open-area">
    <scroll ref="scroll" class="arealist-wrapper"
            :data="allList"
            v-if="allList.length"
            :pulldown="pulldown"
            :probe-type="probeType"
            @scrollNearTop="refresh"  >
      <div class="arealist">
        <div class="refresh">下拉刷新</div>
        <div class="today">
          <div class="timelist" v-for="item in todayList">
            <h1 class="opentime">{{item.openingtime}}</h1>
            <ul class="openlist">
              <li class="opengame" v-for="game in item.openlist" @click="toDetail(game)">
                <div class="top-wrapper">
                  <div class="pic">
                    <img width="60" height="60" :src="game.ioc_path" :onerror="defaultImg">
                  </div>
                  <div class="desc">
                    <div class="name">{{game.gamename}}</div>
                    <div class="newarea">新服</div>
                  </div>
                </div>
                <div class="areaname">{{game.areaname}}</div>
              </li>
            </ul>
          </div>
        </div>
        <grey-bar></grey-bar>
        <div class="tomorrow">
          <div class="title">明日开服预告</div>
          <div class="timelist" v-for="item in tomorrowList">
            <h1 class="opentime">{{item.openingtime}}</h1>
            <ul class="openlist">
              <li class="opengame" v-for="game in item.openlist" @click="toDetail(game)">
                <div class="top-wrapper">
                  <div class="pic">
                    <img width="60" height="60" :src="game.ioc_path" :onerror="defaultImg">
                  </div>
                  <div class="desc">
                    <div class="name">{{game.gamename}}</div>
                    <div class="newarea">新服</div>
                  </div>
                </div>
                <div class="areaname">{{game.areaname}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </scroll>
    <div class="loading-container" v-show="showLoading">
      <loading></loading>
    </div>
    <div class="no-data" v-if="!showLoading && todayList.length<=0">
    	<div class="detail-info">
		  <span class="text">暂无数据~</span>
		</div>
    	
    </div>
    <top-tip ref="toptip"></top-tip>
    <router-view></router-view>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import topTip from 'base/top-tip/top-tip'
  import greyBar from 'base/grey-bar/grey-bar'
  import loading from 'base/loading/loading'
  import {getOpenAreaList} from 'api/open'
  import {normalizeImage2} from 'common/js/game-img'
  import {getChannel} from 'api/channel'
  import storage from 'good-storage'

  export default {
    data () {
      return {
	  	channel:"",
        todayList:[],
        tomorrowList:[],
        pulldown:true,
        probeType:3,
        showLoading:true,
        defaultImg: 'this.src='+'"static/img/error.png"'
      }
    },
    computed:{
      allList(){
        let arr = this.todayList.concat(this.tomorrowList);
        return arr
      }
    },
    mounted(){
      this.initData(false);
	  	this.channel=getChannel()
    },
    methods:{
      initData(ispulldown){
      	var isNet = true;
      	try{
      		// 检测是否有网络
	      	isNet = myObj.checknet('检测是否有网络');
      	}catch(error){}
	      if(isNet){
	        if(!ispulldown){
	          this.showLoading = true;
	        }
	        getOpenAreaList(this.channel).then((res)=>{
	          this.showLoading = false;
	          console.log(res);
	          storage.set('openarea-json',res);
	          this.todayList= normalizeImage2(res.today);
	          this.tomorrowList = normalizeImage2(res.tomorrow);
	          if(ispulldown){
	            this.$refs.toptip.show(0);
	          }
	        }).catch((err)=>{
	          this.showLoading = false;
	          if(ispulldown){
	            this.$refs.toptip.show(1);
	            return
	          }
	          var openareajson = storage.get('openarea-json', 404);
	          if(openareajson === 404){
	            this.$refs.toptip.show();
	          }else{
		          this.todayList= normalizeImage2(openareajson.today);
		          this.tomorrowList = normalizeImage2(openareajson.tomorrow);
	          }
	        })
        }else{
        	this.showLoading = false;
          if(ispulldown){
            this.$refs.toptip.show(1);
            return
          }
          var openareajson = storage.get('openarea-json', 404);
          if(openareajson === 404){
            this.$refs.toptip.show();
          }else{
	          this.todayList= normalizeImage2(openareajson.today);
	          this.tomorrowList = normalizeImage2(openareajson.tomorrow);
          }
        }
      },
      toDetail(item){
        this.$router.push({path:'/openarea/'+item.gameid});
      },
      refresh(){
        this.initData(true);
      }
    },
    beforeRouteEnter(to, from, next){
	    	next(true)
	    	window.document.location = "js://webview?network=1"
    },
    components:{
      scroll,
      greyBar,
      topTip,
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.no-data {
	  position: absolute;
	  width: 100%;
	  top: 40%;
	  text-align: center;
	}
	.no-data .detail-info{
	  font-size: 15px;
	  line-height: 15px;
	  color: #999999;
	  margin-top: 25px;
	}
	
	
  .open-area{
    position: fixed;
    top: 0;
    bottom:60px;
    width:100%;
  }
  .open-area .arealist-wrapper{
    height:100%;
    overflow: hidden;
  }
  .open-area .arealist{
    position: relative;
    min-height:101%; 
  }
  .open-area .arealist .refresh{
    position: absolute;
    top:-30px;
    width: 100%;
    text-align: center;
  }
  .open-area .arealist .today{
    padding-top:10px;
  }
  .open-area .arealist .timelist .opentime{
    margin-bottom:32px;
    width: 100px;
    height: 30px;
    font-size:14px;
    line-height:30px;
    text-align: center;
    border-radius: 0 15px 15px 0;
    background:#0adaee;
    color: #fff;
  }
  .open-area .arealist .timelist .openlist{
    padding:0 15px;
  }
  .open-area .arealist .timelist .openlist .opengame{
    margin-bottom:23px;
    display: inline-block;
    width:50%;
    box-sizing:border-box;
  }
  .open-area .arealist .timelist .openlist .opengame .top-wrapper{
    width:100%;
    display: flex;
    align-items: center;
    margin-bottom:8px;
  }
  .open-area .arealist .timelist .openlist .opengame .top-wrapper .pic{
    flex:0 0 60px;
    width:60px;
    font-size:0;
  }
  .open-area .arealist .timelist .openlist .opengame .top-wrapper .desc{
    flex:1;
    padding:0 10px;
  }
  .open-area .arealist .timelist .openlist .opengame .top-wrapper .desc .name{
    width:85px;
    height:20px;
    font-size: 16px;
    line-height:20px;
    margin-bottom:8px;
    overflow: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
  .open-area .arealist .timelist .openlist .opengame .top-wrapper .desc .newarea{
    font-size:14px;
    color: #ff9900;
  }
  .open-area .arealist .timelist .openlist .opengame .areaname{
    width:130px;
    height: 26px;
    text-align: center;
    font-size:12px;
    line-height:26px;
    /*border:1px solid #f6e16f;*/
    border:1px solid rgba(246,225,111,0.4);
    border-radius:13px;
    background:#fdfbdb;
    color:#ff6600;
  }
  .open-area .arealist .tomorrow .title{
    font-size: 16px;
    line-height:40px;
    text-align: center;
    color:#98cf4a;
  }
  .open-area .arealist .tomorrow .timelist .opentime{
    background:#98cf4a;
  }
  .open-area .loading-container{
    position: absolute;
    width: 100%;
    top: 60%;
    transform: translateY(-50%);
  }
</style>

