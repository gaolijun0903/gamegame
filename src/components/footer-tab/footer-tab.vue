<template>
<div class="tab border1px-deep">
	<router-link tag="div" class="tab-item" to="/game">
		<div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-youxi"></i>
      </div>
      <div class="text">
        <span class="tab-link">游戏</span>
      </div>
    </div>
	</router-link>
	<router-link tag="div" class="tab-item" to="/openarea">
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-weibiaoti119"></i>
      </div>
      <div class="text">
        <span class="tab-link">开服</span>
      </div>
    </div>
	</router-link>
	<router-link tag="div" class="tab-item" to="/search">
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-sousuo"></i>
      </div>
      <div class="text">
        <span class="tab-link">搜索</span>
      </div>
    </div>
	</router-link>
  <router-link tag="div" class="tab-item" to="/rank">
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-paixing"></i>
      </div>
      <div class="text">
        <span class="tab-link">排行</span>
      </div>
    </div>
  </router-link>
</div>
</template>

<script>
export default{}
</script>

<style>
.tab{
  position: fixed;
  bottom: 0;
  left:0;
	display: flex;
  box-sizing: border-box;
  align-items: center;
  width:100%;
	height: 60px;
  /*border-top:1px solid #b2b2b2;*/
  background: #eaeaea;
  color: #bababa;
  z-index:10;
  font-weight:100;
}
.tab .tab-item{
	flex: 1;
	text-align: center;
}
.tab .tab-item .tab-inner{
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tab .tab-item .tab-inner .icon{
  font-size:0;
}
.tab .tab-item .tab-inner .iconfont{
  font-size: 32px;
}
.tab .tab-item .tab-inner .text{
  font-size: 14px;
  line-height:24px;
}
.tab .tab-item.router-link-active  .tab-inner{
	color: #00a98f;
}
</style>
