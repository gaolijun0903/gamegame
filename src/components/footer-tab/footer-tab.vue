<template>
<div class="footer-tab border1px-top">
	<router-link tag="div" class="tab-item" to="/game" replace>
		<div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-youxi"></i>
      </div>
      <div class="text">
        <span class="tab-link">游戏</span>
      </div>
    </div>
	</router-link>
	
   <router-link tag="div" class="tab-item" to="/activity" replace>
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-huodong"></i>
      </div>
      <div class="text">
        <span class="tab-link">活动</span>
      </div>
    </div>
  </router-link>
	
	<router-link tag="div" class="tab-item" to="/openarea" replace>
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-caidan"></i>
      </div>
      <div class="text">
        <span class="tab-link">开服</span>
      </div>
    </div>
	</router-link>
	
	
	<router-link tag="div" class="tab-item" to="/search" replace>
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="text">
        <span class="tab-link">搜索</span>
      </div>
    </div>
	</router-link>
	
	
   <router-link tag="div" class="tab-item" to="/kefu" replace>
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-mine_icon_customer"></i>
      </div>
      <div class="text">
        <span class="tab-link">客服</span>
      </div>
    </div>
  </router-link>
</div>
</template>

<script>
export default{}
</script>

<style>
.footer-tab{
  position: fixed;
  z-index:-10;
  bottom: 0;
  left:0;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #eaeaea;
  color: #bababa;
  font-weight: 100;
  padding-top: 5px;
}
.footer-tab .tab-item{
	flex: 1;
	text-align: center;
}
.footer-tab .tab-item .tab-inner{
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.footer-tab .tab-item .tab-inner .icon{
  font-size:0;
}
.footer-tab .tab-item .tab-inner .iconfont{
  font-size: 28px;
}
.footer-tab .tab-item .tab-inner .text{
  font-size: 14px;
  line-height:24px;
}
.footer-tab .tab-item.router-link-active  .tab-inner{
	color: #00a98f;
}
</style>
