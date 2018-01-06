<template>

  <div class="activity">
    <div class="back-title">
	    <div class="title">活动</div>
	</div>
	 <scroll ref="scroll" class="activity-content"
            :data="activitydatalist"
            :pullup="pullup"
            @scrollNearEnd="addMore"
            :pulldown="pulldown"
            @scrollNearTop="downRefresh"
            >
	 <ul>
	  <activity-list :data="activitydatalist" @toDetail="toDetail"></activity-list>
	   <div class="no-more" v-show="!hasMore">
                <div class="line"></div>
                <div class="text">我是有底线的</div>
                <div class="line"></div>
       </div>
	   	<div class="no-more" v-show="!showerror">
                <div class="line"></div>
                <div class="text">网络出错了</div>
                <div class="line"></div>
       </div>
	 </ul>
	  <div class="loading-container" v-show="showLoading">
        <loading></loading>
      </div>
	</scroll> 
    <router-view></router-view>
  </div>
 
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import {getActivityList,addMoreActivityList} from 'api/activity'
  import loading from 'base/loading/loading'
  import activityList from 'base/activity-list/activity-list'
  import {getChannel} from 'api/channel'
  export default {
    data(){
      return{
	    channel:"",
		showLoading:false,
		pullup:true,
		pulldown:true,
		showerror:true,
		page:1,
		hasMore:true,   	//判断是否还需要加载
		activitydatalist:[]
      }
    },
    created(){
      this.initData(false);
    },
    methods:{
      initData(){
        var isNet = true;
		this.hasMore=true;
		this.page=1;
      	try{
      		// 检测是否有网络
	      	isNet = myObj.checknet('检测是否有网络');
      	}catch(error){ this.useStorage();}
		if (isNet){
			this.channel=getChannel();
			this.showLoading = true;
			this.showerror =true;
			getActivityList(this.channel).then((res)=>{
				this.activitydatalist=res;
				this.showLoading = false;
	        })
        }else{
			this.useStorage();
       	}

      },
 	  useStorage(){
		this.showerror = false; 
      },
	  
	  addMore(){
		console.log("上拉加载")
		if(!this.hasMore){
          return
        }
		this.page++;
		addMoreActivityList(this.page,this.channel).then((res)=>{
		  this.showerror =true;
          this.activitydatalist = this.activitydatalist.concat(res.list);
          if(this.page===res.total_page){
            this.hasMore = false;
          }
          this.$nextTick(()=>{
            this.$refs.scroll.refresh();
          })
        }).catch((err)=>{
          this.page--;
        })
	  },
	  downRefresh(){
      	console.log("下拉刷新")
      	this.initData(true);
      },
	  toDetail(item){
	  	 this.$router.push({path:'/activity/'+item.id})
	  	//console.log(item.id);
      },
    },
    beforeRouteEnter(to, from, next){
      next(true)
      window.document.location = "js://webview?network=1"
    },
    components:{
      scroll,
	  loading,
	  activityList
    }
  }
</script>

<style>
.activity{
  position: fixed;
  top: 0;
  bottom: 100px;
  width: 100%;

}
.activity .activity-content{
    height: 100%;
    overflow: hidden; 
}
.activity .back-title{
    height:36px;
    background: #12cdb0;
}
.activity .back-title .title{
	width: 100%;
    line-height: 36px;
    text-align: center;
	font-size:24px;
    color:#FFFFFF;
}


.activity .loading-container{
    position: absolute;
    width: 100%;
    top: 60%;
    transform: translateY(-50%);
  }
  
.activity .activity-content .no-more{
    display:flex;
    width:80%;
    margin:12px auto 8px;
}

.activity .activity-content .no-more .line{
    flex:1;
    position:relative;
    top: -7px;
    border-bottom: 1px solid #eee;
}

.activity .activity-content .no-more  .text{
    padding:0 12px;
    font-size:12px;
    text-align: center;
    color:#dcdcdc;
}

</style>
