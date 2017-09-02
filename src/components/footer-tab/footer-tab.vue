<template>
<div class="tab">
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
	<router-link tag="div" class="tab-item" to="/service">
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
        <i class="iconfont icon-sousuo1"></i>
      </div>
      <div class="text">
        <span class="tab-link">搜索</span>
      </div>
    </div>
	</router-link>
  <router-link tag="div" class="tab-item" to="/rank">
    <div class="tab-inner">
      <div class="icon">
        <i class="iconfont icon-paixingbang"></i>
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
  width:100%;
	height: 60px;
  background: #eaeaea;
  color: #bababa;
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
.tab .tab-item .tab-inner .iconfont{
  font-size: 32px;
  line-height:40px;
}
.tab .tab-item .tab-inner .text{
  font-size: 14px;
  line-height:20px;
}
.tab .tab-item.router-link-active  .tab-inner{
	color: #00a98f;
}
</style>
