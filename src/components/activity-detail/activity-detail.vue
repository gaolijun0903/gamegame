<template>
	<div class="activity_detail"> 
	    <div class="back-title">
			<div class="back" @click="back()">
			      <i class="iconfont icon-fanhui"></i>
			    </div>
	    	<div class="title">活动</div>
		</div>
	<scroll ref="scroll" class="activity-content"
            :data="datalist"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scrollPos"
            >
	 <ul>
	 <div class="title">{{title}}</div>
	 <div class="msg"  v-html="content"></div>
	   	<div class="no-more" v-show="showerror">
                <div class="line"></div>
                <div class="text">网络出错了</div>
                <div class="line"></div>
       </div>
	 </ul>
	  <div class="loading-container" v-show="showLoading">
        <loading></loading>
      </div>
	</scroll> 
		
		
	</div>
</template>
<script> 
import scroll from 'base/scroll/scroll'
import scrollX from 'base/scroll-x/scroll-x'
import loading from 'base/loading/loading'
import {getActivityDetail} from 'api/activity'
import {getChannel} from 'api/channel'
 
export default {
	data(){
      return{
	  showerror:false,
	  showLoading:true,
	  probeType:3,
	  listenScroll:true,
	  title:"",
	  content:"",
	  datalist:[]
	  }
	},
	 created(){
	 	this.channel=getChannel();
	 	this.initData()
		
    },
	methods:{
      initData(){
	  	this.showLoading=true;
        getActivityDetail(this.$route.params.id,this.channel).then((res)=>{
				this.title=res.title;
				this.content=res.content;
				this.showLoading=false;
			 this.$nextTick(()=>{
           this.$refs.scroll.refresh();
          })
        }).catch((err)=>{
          console.log('detail-err')
          this.showLoading = false;
		  this.showerror = true;
        })
		
      },
      back(){
        this.$router.back();
      },
      scrollPos(pos){
        //console.log(pos.y)(295+136)
        if(Math.abs(pos.y)>=331){
          this.showfixedtop = true;
        }else{
          this.showfixedtop = false;
        }
      },
	},
    components:{
      scroll,
	  loading
    }
}

</script>
<style>
.activity_detail{
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
}



.activity_detail .back-title .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    color: #FFFFFF;
}

.activity_detail .back-title .back .iconfont.icon-fanhui {
    display: block;
    font-size: 22px;
    padding: 0px 6px;
    line-height: 36px;
    color: #FFFFFF;
}

.activity_detail .back-title{
    height:36px;
    background: #12cdb0;
}
.activity_detail .back-title .title{
    line-height: 36px;
    text-align: center;
	font-size:24px;
    color:#FFFFFF;
	width: 100%;
}

.activity_detail .activity-content{
    height: 100%;
    overflow: hidden; 
	 padding: 10px 15px;
}

.activity_detail .activity-content .title{
   	font-size:24px;
    text-align: center;
	width:100%;
	word-wrap: break-word;
	padding-bottom:10px;
	border-bottom: 1px solid #eee;
	
}

.activity_detail .activity-content .msg{
	width:100%;
	word-wrap: break-word;
	padding-bottom:80px;
	padding-top:10px;
}

</style>