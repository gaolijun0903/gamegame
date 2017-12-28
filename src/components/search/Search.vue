<template>
  <div class="search">
    <div class="searchbox-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="recommends" v-show="!showResult">
      <scroll class="recommends-scroll" ref="recommendsScroll" :data="totalList" >
        <div>
          <div class="types">
            <h1 class="title">玩法类型</h1>
            <ul class="items-list">
              <li class="type-item" v-for="item in types" @click="selectItem(item.typename)">{{item.typename}}</li>
            </ul>
          </div>
          <div class="hots">
            <h1 class="title">热门题材</h1>
            <ul class="items-list">
              <li class="type-item" v-for="item in hots" @click="selectItem(item.name)">{{item.name}}</li>
            </ul>
          </div>
          <div class="search-history border1px-top" v-show="historyList.length>0">
            <h1 class="history-title">
              <span class="title-text">搜索历史</span>
              <span class="clear" @click="clearHistory">
                <i class="iconfont icon-qingkong"></i>清空
              </span>
            </h1>
            <ul class="history-list">
              <li class="type-item" v-for="item in historyList" @click="selectItem(item)">{{item}}</li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="showResult">
      <scroll class="search-scroll" :data="searchResult" v-show="searchResult.length>0" @beforeScrollStart="blurInput">
        <game-list :data="searchResult" @toDetail="toDetail" @download="download"></game-list>
      </scroll>
      <div class="no-result" v-show="searchResult.length===0">
        <div>
          <i class="iconfont icon-shibai"></i>
        </div>
        <div> 没有找到,请换个词试试</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import searchBox from 'base/search-box/search-box'
  import scroll from 'base/scroll/scroll'
  import gameList from 'base/game-list/game-list'
  import {getRecommendList,getSearchList} from 'api/search'
  import {loadSearch,saveSearch,clearSearch} from 'common/js/cache'
  import {baseUrl} from "common/js/util"
  import {getChannel} from 'api/channel'
  import {normalizeImage} from 'common/js/game-img'
  export default {
    data() {
      return {
	  	channel:"",
        showResult:false,
        types:[],
        hots:[],
        historyList:loadSearch(),
        searchResult:[]
      }
    },
    computed:{
      totalList(){
        return this.types.concat(this.hots.concat(this.historyList))
      }
    },
    created(){
      this.initData();
	  
    },
    methods:{
      initData(){
	  	this.channel=getChannel();
        getRecommendList(this.channel).then((res)=>{
          console.log(res)
          this.types = res.typelist;
          this.hots = res.recommendlist;
        }).catch((err)=>{
          console.log(err)
        })
      },
      onQueryChange(newQuery){
        if(newQuery===''){
          this.showResult = false;
          return
        }
        getSearchList(newQuery,this.channel).then((res)=>{
          this.showResult = true;
          console.log('search-result')
          console.log(res)
          this.searchResult = normalizeImage(res.gamelist);
        })
        this.historyList = saveSearch(newQuery); //添加到搜索历史的缓存中
        this.blurInput();
        this.$refs.recommendsScroll.refresh();
      },
      selectItem(item){
        this.$refs.searchBox.setQuery(item);
      },
      blurInput(){
        //alert('blur')
        this.$refs.searchBox.blur();
      },
      clearHistory(){
        this.historyList = clearSearch();
      },
      toDetail(item){
        this.$router.push({path:'/search/'+item.gameid});
      },
      download(item){
      	// 检测是否有网络
        var isNet = true;
      	try{
      		// 检测是否有网络
	      	isNet = myObj.checknet('检测是否有网络');
      	}catch(error){}
      	if(isNet){
      		var downurl = item.apkname;
        	console.log(downurl);
        	window.location.href = downurl;      		
      	}
      }
    },
    beforeRouteEnter(to, from, next){
    	next(true)
    	window.document.location = "js://webview?network=1"
    },
    components:{
      searchBox,
      scroll,
      gameList
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search{
    position: fixed;
    top: 0;
    bottom:60px;
    left: 0;
    width:100%;
  }
  .search .searchbox-wrapper{
    width:100%;
    height: 30px;
    padding:6px;
    background: #12cdb0;
  }
  .search .recommends,.search .search-result{
    position: absolute;
    top: 42px;
    bottom: 0;
    width:100%;
    background: #fff;
  }
  .search .search-result{
    bottom: -60px;
  }
  .search .recommends .recommends-scroll, .search .search-result .search-scroll{
    height: 100%;
    overflow: hidden;
  }
  .search .recommends .title{
    margin-top: 10px;
    width: 66px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    border-radius: 0 15px 15px 0;
    background: #0adaee;
    color: #fff;
  }
  .search .recommends .type-item{
    margin: 0 10px 10px 0;
    display: inline-block;
    vertical-align: middle;
    height: 30px;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
    font-size: 12px;
    line-height: 30px;
    border: 1px solid #e2e2e2;
    border-radius: 15px;
    background: #fbf9fa;
    color: #666465;
  }
  .search .recommends .items-list{
    padding: 10px 10px 0 10px;
  }
  .search .recommends .search-history{
    margin-top: 10px;
  }
  .search .recommends .search-history .history-title{
    position: relative;
    height: 30px;
    padding: 5px 15px;
    font-size: 14px;
    line-height: 30px;
    color: #bababa;
  }
  .search .recommends .search-history .history-title .clear{
    position: absolute;
    right: 15px;
    top: 5px;
    font-size:12px;
  }
  .search .recommends .search-history .history-title .clear .icon-delete{
    font-size:12px;
  }
  .search .recommends .search-history .history-list{
    padding: 10px 10px 0 10px;
  }
  .search .recommends .search-history .history-list .type-item{
    border: 1px solid #00a98f;
    color: #00a98f;
    background: #fff;
  }
  .search .search-result .no-result{
    position: absolute;
    top: 50%;
    width:100%;
    transform: translate3d(0,-50%,0);
  }
  .search .search-result .no-result{
    text-align: center;
    font-size: 20px;
    line-height: 40px;
  }
  .search .search-result .no-result .icon-shibai{
    color:#fe3838;
    font-size: 100px;
  }


</style>
