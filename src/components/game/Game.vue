<template>
  <div class="game">
    <div class="game-content">
      <div>
        <div class="slider-wrapper">
          <slider>
            <div v-for="item in sliderPics">
              <a href="">
                <img class="needsclick" @load="loadImage" :src="item.imgpath" />
              </a>
            </div>
          </slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getGamelist} from 'api/game'
  import slider from 'base/slider/slider'

  export default{
    data () {
      return {
        sliderPics:[]
      }
    },
    created(){
      this.initData()
    },
    methods:{
      initData(){
        getGamelist().then((res)=>{
          console.log(res)
          this.sliderPics = this.normalizeImage(res.focuslist)
        })
      },
      normalizeImage(list){
        list.forEach((item)=>{
          item.imgpath = 'http://app.kf989.com'+item.imgpath
        })
        return list
      },
      loadImage(){

      }
    },
    components:{
      slider
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 80px;
  }
  .game .game-content{
    height: 100%;
    overflow: hidden;
  }
  .game .slider-wrapper{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
</style>
