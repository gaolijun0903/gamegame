<template>
  <div class="activity-list">
    <li class="border1px" v-for="item in data" @click="toDetail(item)">
	
	
	  <div class="pic">
        <img width="60" height="60" :src="item.ioc_path"  :onerror="defaultImg" />
      </div>
	 <div class="desc">
        <div class="name">
          <div class="text">{{item.title}}</div>
        </div>
        <div class="size-role-percent">
        {{item.date}}
        </div>
      </div>
	  
	  
		
	</li> 
  </div>
</template>

<script>
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
      }
	}  
  }
</script>

<style>
.activity-list{
	z-index:-11;
}
.activity-list li{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 15px;
}

.activity-list .border1px {
    position: relative;
}

.activity-list .border1px .pic{
 	flex:0 0 75px;
    width:75px;
    font-size:0;

}

.activity-list .border1px .desc{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
}

.activity-list .border1px .desc .name{
    margin-bottom:8px;
    font-size:14px;
	line-height:24px;
}

.activity-list .border1px .desc .size-role-percent{
	margin-bottom:4px;
    font-size:12px;
	color:#999; 
}




</style>
