<template>
	<div class="app">
	<!-- 头部 -->
	<mt-header fixed title="vuejs项目"></mt-header>
	 	<!--返回按钮-->
		<div class="back" v-if="isShow">
			<a @click="goback">返回</a>
		</div>

	
	<router-view></router-view>

	<!-- 底部 -->
	<nav  class="mui-bar mui-bar-tab">
		<!-- 1 -->
		<router-link class="mui-tab-item" to="/Home">
			<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
		</router-link>

		<router-link class="mui-tab-item" to="/member">
		<span class="mui-icon mui-icon-contact">
				
			</span>
			<span class="mui-tab-label">会员</span>
		</router-link>

		<router-link class="mui-tab-item" to="/shopcar">
		<span class="mui-icon mui-icon-home">
			<span id="badge" class="mui-badge">0</span>
		</span>
			<span class="mui-tab-label">购物车</span>
		</router-link>

		<router-link class="mui-tab-item" to="/search">
			<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
		</router-link>
	</nav>
	</div>
</template>

<script>
	注册commonvue.js(用来接收goodsinfo.vue中通过vueobj.$emit()发送过来的数据 )
	import {vueobj} from './kits/commonvue.js';
	//注册接收事件
	vueobj.$on('shopdata',function(data){
		
		let badge = document.getElementById('badge');
		let count = badge.innerText - 0; // 获取原始值
		count+=data;

		badge.innerText = count;
	});

	export default{
		data(){
			return {
				isShow:false //这个就是用来控制返回按钮显示和隐藏的
			}
		},
		watch:{
			//监控当前的路由对象 $route ，如果url中的路由规则发生了改变，那么就会触发这个方法
			'$route':function(newval,oldval){
				if(newval.path.toLowerCase() == '/home'){
				
					this.isShow = false;
				}else{
					//非首页要显示返回按钮
					this.isShow = true;
				}
			}
		},
		methods:{
			goback(){
				this.$router.go(-1); //返回上一个页面
			}
		}
	}

</script>

<style scoped>
	.back{
		position: fixed;
		top:10px;
		left:10px;
		z-index: 50;
	}
	.back a{
		font-size: 16px;
		color: #fff;
		font-weight:bold;
	}
</style>