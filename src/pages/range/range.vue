<template>

</template>

<script>
let canDrag = false
let persentWidth = 0
export default {
	
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.range
		width:90%
		height:100%
		display:flex
		margin: 0 auto
		align-items:center
		display:flex
		box-sizing:border-box
		padding:0 10px
		.rangeicon
			font-size:14px
			color:rgba(255,255,255,0.7)
			margin-right:10px
		.span-left
			font-size:12px
			color:rgba(255,255,255,0.8)
			margin-right:10px
		.duration
			flex:1
			height:2px
			border-radius:1px
			background:rgba(244,244,244,0.3)
			margin:0 auto
			font-size:0
			cursor:pointer
			position:relative
			.currentProgress
				display:inline-block
				width:0%
				height:2px
				background:red
				float:left
				background:$primarycolor
			.ball
				// display:inline-block
				position:absolute
				width:14px
				height:14px
				left:-7px
				// margin-top:-6px
				background:#fff
				// transform:translate(-50%,0)
				border-radius:50%
				cursor:pointer
		.span-right
			font-size:12px
			color:rgba(255,255,255,0.8)
			margin-left:10px
</style>
