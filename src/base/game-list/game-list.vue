<template>
  <div class="game-list">
    <li class="gamelist-item border1px " v-for="item in data" @click="toDetail(item)">
      <div class="pic">
        <img width="60" height="60" :src="item.ioc_path"  :onerror="defaultImg" />
      </div>
      <div class="desc">
        <div class="name">
          <div class="text">{{item.name}}</div>
          <icon-tag  v-show="item.tj==='1'"></icon-tag>
        </div>
        <div class="size-role-percent">
          <span class="roundbg size">{{item.apksize}}MB</span>
          <span class="roundbg role">{{item.typename}}</span>
          <span class="roundbg percent">比例&nbsp;1:{{item.bl}}</span>
        </div>
        <div class="sketch">{{item.sketch}}</div>
      </div>
      <div class="download-btn" @click.stop="download(item)">下载</div>
    </li>
  </div>
</template>

<script>
  import iconTag from 'base/icon-tag/icon-tag'

  export default {
  	data(){
  		return {
  			defaultImg: 'this.src='+'"static/img/error.png"'
  		}
  	},
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    methods:{
      toDetail(item){
        this.$emit('toDetail',item)
      },
      download(item){
        this.$emit('download',item)
      }
    },
    components:{
      iconTag
    }
  }
</script>

<style>
  .game-list .gamelist-item{
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding:15px;
  }
  .game-list .gamelist-item .pic{
    flex:0 0 75px;
    width:75px;
    font-size:0;
  }
  .game-list .gamelist-item .desc{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  .game-list .gamelist-item .desc .name{
    margin-bottom:4px;
    font-size:14px;
  }
  .game-list .gamelist-item .desc .name .text{
    display: inline-block;
    vertical-align: middle;
  }
  .game-list .gamelist-item .desc .size-role-percent{
    font-size:12px;
    line-height:16px;
  }
  .game-list .gamelist-item .desc .size-role-percent .roundbg{
    display: inline-block;
    margin-right:3px;
    padding:1px 2px;
    border-radius:3px;
    color: #fff;
  }
  .game-list .gamelist-item .desc .size-role-percent .size{
    background:#ff6600;
  }
  .game-list .gamelist-item .desc .size-role-percent .role{
    background:#6fa924;
  }
  .game-list .gamelist-item .desc .size-role-percent .percent{
    background:#ff6600;
  }
  .game-list .gamelist-item .desc .sketch{
    font-size:12px;
    line-height:18px;
    padding-right:20px;
    color: #a4a4a4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .game-list .gamelist-item .download-btn{
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
</style>
