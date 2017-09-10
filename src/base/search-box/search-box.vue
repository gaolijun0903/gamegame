<template>
<div class="search-box">
	<i class="iconfont icon-sousuo"></i>
	<input type="text" v-model="query" class="box" :placeholder="placeholder" ref="input"/>
	<i class="iconfont icon-unif060" v-show="query" @click="clear"></i>
</div>
</template>

<script>
import {debounce} from 'common/js/util'

export default{
	props:{
		placeholder:{
			type:String,
			default:'搜索游戏'
		}
	},
	data(){
		return {
			query:''
		}
	},
	created(){
		this.$watch('query',debounce((newQuery)=>{
			this.$emit('query',newQuery)   //debounce节流处理
		},200))
	},
	methods:{
		clear(){
			this.query = ''
		},
		setQuery(query){
			this.query = query;
		},
		blur(){
			this.$refs.input.blur();
		}
	}
}
</script>

<style>
.search-box{
  margin: 0 auto;
	display: flex;
	align-items: center;
	width:80%;
	height: 30px;
	padding: 0 6px;
	box-sizing: border-box;
  background: #a0ebdf;
	border-radius: 15px;
  color:#5ca79e;
}
.search-box .icon-sousuo{
	font-size: 24px;
}
.search-box .box{
	flex:1;
	margin:0 5px;
	font-size: 14px;
	line-height: 26px;
  background: #a0ebdf;
  color:#075246;
  border:none;
  outline:none;
}
.search-box .box::placeholder{
  color:#5ca79e;
}
.search-box .icon-unif060{
	font-size: 16px;
}
</style>
