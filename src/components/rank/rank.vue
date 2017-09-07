<template>
    <div class="rank">
排行
    </div>
</template>

<script>

    export default {
    	beforeRouteEnter(to, from, next){
	    	next(true)
	    	window.document.location = "js://webview?network=1"
	    }
    }
</script>

<style>

</style>
