<template>
  <div class="scroll-x" ref="scrollX">
    <div class="scroll-group" ref="scrollGroup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props:{
      data: {
        type: Array,
        default: null
      },
      refreshDelay:{
        type:Number,
        default:20
      }
    },
    mounted(){

    },
    methods:{
      initScrollX(){
        this._setWidth();
        this._initScroll();
      },
      _setWidth(){
        this.children = this.$refs.scrollGroup.children;
//        console.log('scrollX--children')
//        console.log(this.children)
        let width = this.children[0].clientWidth * this.children.length;
        this.$refs.scrollGroup.style.width = width + 'px';
      },
      _initScroll(){
        this.scroll = new BScroll(this.$refs.scrollX,{
          scrollX: true,
          scrollY: false
        })
      },
      refresh(){
        this.scroll && this.scroll.refresh();
      }
    },
    watch: {
      data(){
        setTimeout(()=>{
          this.refresh();
        },this.refreshDelay)
      }
    }
  }
</script>

<style>
  .scroll-x{
    min-height: 1px;
    height:100%;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
