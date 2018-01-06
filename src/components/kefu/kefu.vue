<template>
  <div class="kefu">
    <div class="back-title">
	    <div class="title">客服中心</div>
	</div>
	<div class="kefu_info"  v-show="isinfo">
		<ul>
			<li class="lianxitext" @click="dakaiqq">请点击 <font color="#FF0000">QQ客服</font> 在线沟通[手机必须安装QQ]</li>
			<li class="lianxitext">微信号: {{weixin}}</li>
			<li class="lianxiimg" v-show="isweixinimg" ><img width="200" height="200" :src="detailObj.ioc_path" :onerror="defaultImg"></li>
		</ul>
	</div>
	<div class="no-more" v-show="showerror">
                <div class="line"></div>
                <div class="text">网络出错了</div>
                <div class="line"></div>
    </div>
  </div>
</template>

<script>
 import {getChannel} from 'api/channel'
 import {getKufu} from 'api/kefu'
  export default{
  	  data(){
      return{
	    channel:"",
		qq:"稍后。。。",
		weixin:"稍后。。。",
		 detailObj:{
          ioc_path: "static/img/error.png"
        },
		showLoading:false,
		showerror:false,
		isweixinimg:false,
		isinfo:false,
		defaultImg: 'this.src='+'"static/img/error.png"'
      }
    },
	created(){
      this.initData(false);
    },
	methods:{
      initData(){
        var isNet = true;
      	try{
      		// 检测是否有网络
	      	isNet = myObj.checknet('检测是否有网络');
      	}catch(error){ 
			this.isinfo=false;
			this.showerror=true;
		}
		if (isNet){
			this.channel=getChannel();
			getKufu(this.channel).then((res)=>{
				this.isinfo=true;
				this.showerror=false;
				this.qq=res.qq;
				this.weixin = res.weixin;
				if (res.weixinmimg==""){
					this.isweixinimg=false;
				}else{
					this.isweixinimg=true;
					this.detailObj.ioc_path ="static/"+res.weixinimg;
				}
	        })
        }else{
			this.useStorage();
			this.isinfo=false;
			this.showerror=true;
       	}

      },
	  dakaiqq(){
	  	window.myObj.openQQ(this.qq);
	  }
	   
	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .kefu{
    position: fixed;
    top: 0;
    bottom: 60px;
    width: 100%;
  }
.kefu .back-title{
    height:120px;
    background: #12cdb0;
}

.kefu .back-title .title{
	text-align:node;
    line-height: 120px; 
	font-size:24px;
    color:#FFFFFF;
}

.kefu  .kefu_info{
	margin:50px;
	border: 1px solid #eee; 
}
.kefu  .kefu_info .lianxitext{
	line-height:50px;
	font-size:12px;
	font-weight:800;
	padding-left:10px;
	color:#666;
	border-bottom: 1px solid #eee;
}
.kefu  .kefu_info .lianxiimg{
	text-align:center;
	padding:10px;
}

</style>

