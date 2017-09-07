<template>
  <div class="game">
    <scroll ref="scroll" class="game-content"
            :data="gamelist"

    >
      <div>
        <div class="slider-wrapper" v-if="focuslist.length">
          <slider>
            <div v-for="item in focuslist" @click="toDetail(item)">
              <img class="needsclick" @load="loadImage" :src="item.imgpath" />
            </div>
          </slider>
        </div>


        <div class="gamelist-wrapper">
          <ul>
            <li class="gamelist-item border1px " v-for="item in gamelist" @click="toDetail(item)">
              <div class="pic">
                <img width="60" height="60" :src="item.ioc_path" />
              </div>
              <div class="desc">
                <div class="name">
                  <div class="text">{{item.name}}</div>

                </div>

              </div>
            </li>

          </ul>
        </div>
      </div>

    </scroll>

    <router-view></router-view>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import slider from 'base/slider/slider'
  import loading from 'base/loading/loading'
  import {getData} from 'api/game'

  export default{
    data () {
      return {
        focuslist:[],
        gamelist:[],
      }
    },
    created(){
      this.initData();
    },
    methods:{
      initData(){
        getData().then((res)=>{
          console.log(res)
          this.focuslist = res.focuslist;
          this.gamelist = res.gamelist;
//          this.focuslist = this.normalizeImage(res.focuslist);
//          this.gamelist = this.normalizeImage1(res.gamelist);

        })

      },
      normalizeImage(list){
        list.forEach((item)=>{
            item.imgpath = 'http://app.kf989.com'+item.imgpath;
        })
        return list;
      },
      normalizeImage1(list){
        list.forEach((item)=>{
          item.ioc_path = 'http://app.kf989.com' + item.ioc_path;
        })
        return list;
      },
      loadImage(){
        if (!this.checkLoaded){
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      },
      toDetail(item){
        this.$router.push({path:'/game/'+item.gameid});
      },
      refresh(page){
        if(!page){
          this.initData();
        }else{
          this.loadsucc = true;
          this.addMore();
        }
      },
      download(item){
        console.log(item.name);
        window.location.href = "http://f3.market.xiaomi.com/download/AppStore/06e095d3f6a226d76d97e3bb3c30f5e171e4252fa/com.tencent.qqmusic.apk";
      }
    },
    components:{
      scroll,
      slider,
      loading
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game{
    position: fixed;
    top: 0;
    bottom: 60px;
    width: 100%;
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
    padding: 10px 15px 5px;
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
  .game .newgamelist-wrapper .newgamelist .newgamelist-item{
    display: inline-block;
    width:90px;
    height:130px;
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
  }
  .game .newgamelist-wrapper .newgamelist .newgamelist-item .name{
    margin: 0 auto;
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height:24px;
  }
  .game .newgamelist-wrapper .newgamelist .newgamelist-item .typename{
    font-size: 10px;
    color: #a4a4a4;
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
  .game .gamelist-wrapper .gamelist-item .desc .name .text{
    display: inline-block;
    vertical-align: middle;
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
