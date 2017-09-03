<template>
  <div class="my-icon-tag">
    <div class="inlineblock icon"></div><div class="inlineblock recommend">推荐</div>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  .my-icon-tag,.my-icon-tag .inlineblock{
    display: inline-block;
    vertical-align: middle;
  }
  .my-icon-tag .icon{
    width:0;
    height:0;
    border-width:7px 7px 7px 0;
    border-style:solid;
    border-color:transparent #e32141 transparent transparent;
  }
  .my-icon-tag .recommend{
    font-size: 10px;
    line-height:14px;
    padding:0 2px;
    box-sizing: border-box;
    border-radius:1px 3px 3px 1px;
    background:#e32141;
    color: #fff;
  }
</style>
