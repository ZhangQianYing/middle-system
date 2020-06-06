<template>
	<div ref="imageBox" class="image-view" :style="{ left: (imagePosition.left + 10) + 'px', top: (imagePosition.top + 5) + 'px'}">
		<img :style="{ width: imgSize.width + 'px', height: imgSize.height + 'px'}" :src="imageSrc">
	</div>
</template>

<script>
	// import axios from 'Assets/js/axios.js'

	export default{
		props:['imgSize','imagePosition','imageSrc'],
		
		components:{

		},
		data(){
			return{
            	
			}
		},
		watch: {
			imagePosition(val) {
				let bodyHeight = document.body.clientHeight
				let imageHeight = this.$refs.imageBox.clientHeight
				if((Number(val.top) + Number(imageHeight) + 20) > bodyHeight) {
					val.top = val.top - Number(imageHeight) - 20
				}
			}
		},
		computed: {
			
		},	
		//已成功挂载，相当ready()
		created(){
		},
		//相关操作事件
		methods: {

		}
	}
</script>
<style lang="scss">
	.image-view {
		padding: 10px;
		background: #fff;
		display: inline-block;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		border-radius: 3px;
		position: fixed;
		z-index:1000;
		img {
			vertical-align: bottom;
		}
	}
</style>
