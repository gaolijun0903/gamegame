<template>
  <div class="game">
    <scroll ref="scroll" class="game-content"
            :data="gamelist"
            :pullup="pullup"
            @scrollNearEnd="addMore"
    >
      <div>
        <div class="slider-wrapper" v-if="focuslist.length">
          <slider>
            <div v-for="item in focuslist" @click="toDetail(item)">
                <img class="needsclick" @load="loadImage" :src="item.imgpath" />

            </div>
          </slider>
        </div>

        <div class="newgamelist-wrapper" v-if="newgamelist.length">
          <div class="newgamelist-title">
            <h1 class="title-text">新游下载</h1>
            <!--<div class="icon extend-click">-->
              <!--<i class="iconfont icon-return"></i>-->
            <!--</div>-->
          </div>
          <scroll class="newgamelist" ref="newgamelist" :scroll-x="scrollX" :data="newgamelist">
            <ul class="newgamelist-group" ref="newgamelistGroup">
              <li class="newgamelist-item" v-for="item in newgamelist"  @click="toDetail(item)">
                <div class="pic">
                  <img width="60" height="60" :src="item.ioc_path" />
                </div>
                <div class="name">{{item.name}}</div>
                <div class="download-btn" @click.stop="download(item)">下载</div>
              </li>
            </ul>
          </scroll>
        </div>

        <grey-bar></grey-bar>

        <div class="gamelist-wrapper">
          <ul>
            <li class="gamelist-item" v-for="item in gamelist" @click="toDetail(item)">
              <div class="pic">
                <img width="60" height="60" :src="item.ioc_path" />
              </div>
              <div class="desc">
                <div class="name">
                  <div class="inlineblock text">{{item.name}}</div>
                  <div class="inlineblock" v-show="item.tj==='1'">
                    <div class="inlineblock icon"></div><div class="inlineblock recommend">推荐</div>
                  </div>
                </div>
                <div class="size-role-percent">
                  <span class="roundbg size">{{item.apksize}}MB</span>
                  <span class="roundbg role">{{item.typename}}</span>
                  <span class="roundbg percent">比例&nbsp;1:{{item.bl}}</span>
                </div>
                <div class="sketch">asssaada{{item.sketch}}</div>
              </div>

              <div class="download-btn" @click.stop="download(item)">下载</div>
            </li>
            <loading title="" v-show="hasMore"></loading>
            <div class="no-more" v-show="!hasMore">
              <div class="line"></div>
              <div class="text">我是有底线的</div>
              <div class="line"></div>
            </div>
          </ul>
        </div>
      </div>

      <div class="loading-container" v-show="!gamelist.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import slider from 'base/slider/slider'
  import greyBar from 'base/grey-bar/grey-bar'
  import loading from 'base/loading/loading'
  import {getGamelist,addMoreGamelist} from 'api/game'
  import {cloneObj} from 'common/js/util'

  export default{
    data () {
      return {
        focuslist:[],
        newgamelist:[],
        gamelist:[],
        scrollX:true,
        page:1,
        pullup:true,
        hasMore:true
      }
    },
    created(){
      this.initData();
    },
    methods:{
      initData(){
        getGamelist().then((res)=>{
          console.log('-->')
          console.log(res)
          this.focuslist = this.normalizeImage(res.focuslist);
          this.newgamelist = this.normalizeImage(res.newgamelist);
          this.gamelist = this.normalizeImage(res.gamelist);
          this.$nextTick(()=>{
            this.$refs.scroll.refresh();
            this._setWidth();
          })
        }).catch((err)=>{
          // TODO alert("网络错误")
        })
      },
      addMore(){
        if(!this.hasMore){
          return
        }
        this.page++;

//        addMoreGamelist(this.page).then(()=>{
//          this.gamelist = this.gamelist.concat( this.normalizeImage(res.gamelist) );
//          if(this.page===res.total_page){
//            this.hasMore = false;
//          }
//          this.$nextTick(()=>{
//            this.$refs.scroll.refresh();
//          })
//        })
        getGamelist().then((res)=>{
          this.gamelist = this.gamelist.concat( this.normalizeImage(res.gamelist) );
          if(this.page===5){
            this.hasMore = false;
          }
          this.$nextTick(()=>{
            this.$refs.scroll.refresh();
          })
        })
      },
      normalizeImage(list){
        let _list = cloneObj(list);
        _list.forEach((item)=>{
          if(item.imgpath){
            item.imgpath = 'http://app.kf989.com'+item.imgpath;
          }else if(item.ioc_path){
            item.ioc_path = 'http://app.kf989.com' + item.ioc_path;
          }
        })
        return _list;
      },
      loadImage(){
        if (!this.checkLoaded){
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      },
      toDetail(item){
        console.log(item.gameid);
//        this.$router.push({path:'game/'+item.gameid})
      },
      download(item){
        console.log(item.name);
        window.location.href = "http://f3.market.xiaomi.com/download/AppStore/06e095d3f6a226d76d97e3bb3c30f5e171e4252fa/com.tencent.qqmusic.apk";
      },
      _setWidth(){
        this.children = this.$refs.newgamelistGroup.children;
        let width = this.children[0].clientWidth * this.children.length;
        this.$refs.newgamelistGroup.style.width = width + 'px';
        this.$refs.newgamelist.refresh();
      }
    },
    components:{
      scroll,
      slider,
      greyBar,
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 60px;
  }
  .game .game-content{
    height: 100%;
    overflow: hidden;
  }
  .game .slider-wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .game .newgamelist-wrapper{
    height: 180px;
    overflow: hidden;
  }
  .game .newgamelist-wrapper .newgamelist-title{
    position: relative;
    padding: 10px 15px;
    height:30px;
    font-size:16px;
    line-height: 30px;
  }
  .game .newgamelist-wrapper .newgamelist-title .icon{
    position: absolute;
    right: 15px;
    top:10px;
  }
  .game .newgamelist-wrapper .newgamelist{
    width:100%;
    height:130px;
    overflow: hidden;
  }
  .game .newgamelist-wrapper .newgamelist .newgamelist-group{
    /*width:200%;*/
    height:100%;
    white-space:nowrap;
  }
  .game .newgamelist-wrapper .newgamelist .newgamelist-item{
    display: inline-block;
    width:90px;
    height:130px;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }
  .game .newgamelist-wrapper .newgamelist .newgamelist-item .name{
    font-size: 12px;
    line-height:24px;
  }
  .game .newgamelist-wrapper .newgamelist .newgamelist-item .download-btn{
    font-size: 12px;
    line-height:22px;
    width:50px;
    margin: 5px auto 0;
    border:1px solid #ffb952;
    border-radius:12px;
    color: #ffb952;
  }
  .game .gamelist-wrapper{
    width:100%;
    overflow: hidden;
  }
  .game .gamelist-wrapper .gamelist-item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding:15px;
    border-bottom:1px solid #f2f2f2;
  }
  .game .gamelist-wrapper .gamelist-item .pic{
    flex:0 0 75px;
    width:75px;
    font-size:0;
  }
  .game .gamelist-wrapper .gamelist-item .desc{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .game .gamelist-wrapper .gamelist-item .desc .name{
    margin-bottom:4px;
    font-size:14px;
  }
  .game .gamelist-wrapper .gamelist-item .desc .name .inlineblock{
    display: inline-block;
    vertical-align: middle;
  }
  .game .gamelist-wrapper .gamelist-item .desc .name .icon{
    width:0;
    height:0;
    border-width:7px 7px 7px 0;
    border-style:solid;
    border-color:transparent #e32141 transparent transparent;
  }
  .game .gamelist-wrapper .gamelist-item .desc .name .recommend{
    font-size: 10px;
    line-height:14px;
    padding:0 2px;
    box-sizing: border-box;
    border-radius:1px 3px 3px 1px;
    background:#e32141;
    color: #fff;
  }
  .game .gamelist-wrapper .gamelist-item .desc .size-role-percent{
    font-size:12px;
    line-height:16px;
  }
  .game .gamelist-wrapper .gamelist-item .desc .size-role-percent .roundbg{
    display: inline-block;
    margin-right:3px;
    padding:1px 2px;
    border-radius:3px;
    color: #fff;
  }
  .game .gamelist-wrapper .gamelist-item .desc .size-role-percent .size{
    background:#ff6600;
  }
  .game .gamelist-wrapper .gamelist-item .desc .size-role-percent .role{
    background:#6fa924;
  }
  .game .gamelist-wrapper .gamelist-item .desc .size-role-percent .percent{
    background:#ff6600;
  }
  .game .gamelist-wrapper .gamelist-item .desc .sketch{
    font-size:12px;
    line-height:18px;
    padding-right:20px;
    color: #a4a4a4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
   }
  .game .gamelist-wrapper .gamelist-item .download-btn{
    flex:0 0 50px;
    width:50px;
    height: 50px;
    text-align: center;
    line-height:50px;
    font-size:14px;
    color: #00a98f;
    border:1px solid #00a98f;
    border-radius:25px;
  }
  .game .gamelist-wrapper .no-more{
    display:flex;
    width:80%;
    margin:12px auto 8px;
  }
  .game .gamelist-wrapper .no-more .line{
    flex:1;
    position:relative;
    top: -7px;
    border-bottom: 1px solid #eee;
  }
  .game .gamelist-wrapper .no-more .text{
    padding:0 12px;
    font-size:12px;
    text-align: center;
    color:#dcdcdc;
  }

  .game .game-content .loading-container{
    position: absolute;
    width: 100%;
    top: 60%;
    transform: translateY(-50%);
  }
</style>
