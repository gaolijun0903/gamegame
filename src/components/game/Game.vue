<template>
  <div class="game">
    <div class="game-content">
      <div>
        <div class="slider-wrapper" v-if="focuslist.length">
          <slider>
            <div v-for="item in focuslist">
              <a href="javascript:;">
                <img class="needsclick" @load="loadImage" :src="item.imgpath" />
              </a>
            </div>
          </slider>
        </div>

        <div class="newgamelist-wrapper" v-if="newgamelist.length">
          <div class="newgamelist-title">
            <h1 class="title-text">新游下载</h1>
            <div class="icon extend-click">
              <i class="iconfont icon-return"></i>
            </div>
          </div>
          <scroll class="newgamelist" ref="newgamelist" :scroll-x="scrollX" :data="newgamelist">
            <ul class="newgamelist-group">
              <li class="newgamelist-item" v-for="item in newgamelist">
                <div class="pic">
                  <img width="60" height="60" :src="item.ioc_path" />
                </div>
                <div class="name">{{item.name}}</div>
                <div class="download-btn">下载</div>
              </li>
            </ul>
          </scroll>
        </div>

        <grey-bar></grey-bar>

      </div>
    </div>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import slider from 'base/slider/slider'
  import greyBar from 'base/grey-bar/grey-bar'
  import {getGamelist} from 'api/game'

  export default{
    data () {
      return {
        focuslist:[],
        newgamelist:[],
        scrollX:true
      }
    },
    created(){
      this.initData()
    },
    methods:{
      initData(){
        getGamelist().then((res)=>{
          console.log(res)
          this.focuslist = this.normalizeImage(res.focuslist)
          this.newgamelist = this.normalizeImage(res.newgamelist)
        })
      },
      normalizeImage(list){
        list.forEach((item)=>{
          if(item.imgpath){
            item.imgpath = 'http://app.kf989.com'+item.imgpath
          }else if(item.ioc_path){
            item.ioc_path = 'http://app.kf989.com' + item.ioc_path
          }
        })
        return list
      },
      loadImage(){

      }
    },
    components:{
      scroll,
      slider,
      greyBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 80px;
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
    width:300%;
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
    line-height:24px;
    width:50px;
    margin: 0 auto;
    border:1px solid #ffb952;
    border-radius:10px;
    color: #ffb952;
  }

</style>
