<template>
<transition name="drop">
	<div class="top-tip" v-show="showFlag" @click.stop="hide">
    <div class="tip-title">
      <i class="icon-ok"></i>
      <span class="text">{{tiptext}}</span>
    </div>
	</div>
</transition>
</template>

<script>
	export default{
		props:{
			delay:{
				type:Number,
				default:2000
			}
		},
		data(){
			return {
				showFlag:false,
        tiptext: ''
			}
		},
		methods:{
			show(num){
				this.showFlag = true;
				this.tiptext = num===0? '刷新成功' : '网络出错，刷新失败'
				clearTimeout(this.timer);
				this.timer = setTimeout(()=>{
					this.hide();
				},this.delay)
			},
			hide(){
				this.showFlag = false;
			}
		}
	}
</script>

<style>
.top-tip{
	position: fixed;
	top: 0;
	width: 100%;
  height:30px;
	background: rgba(0,0,0,0.3);
	z-index: 500;
  color:#fff;
  text-align: center;
  font-size:12px;
  line-height:30px;
}
.top-tip.drop-enter-active, .top-tip.drop-leave-active{
	transition: all .3s;
}
.top-tip.drop-enter, .top-tip.drop-leave-to{
	transform: translate3d(0, -100%, 0);
}
</style>
