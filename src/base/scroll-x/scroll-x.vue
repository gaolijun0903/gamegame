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
    mounted(){
      setTimeout(()=>{
        this._setWidth();
        this._initScroll();
      },20)
    },
    methods:{
      _setWidth(){
        this.children = this.$refs.scrollGroup.children;
        let width = this.children[0].clientWidth * this.children.length;
        this.$refs.scrollGroup.style.width = width + 'px';
      },
      _initScroll(){
        this.slider = new BScroll(this.$refs.scrollX,{
          scrollX: true,
          scrollY: false
        })
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
