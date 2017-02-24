//导入相关包
import Vue from 'vue';
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
import '../statics/mui/css/mui.css';
import '../statics/mui/css/icons-extra.css'
import mintUI from 'mint-ui'
Vue.use(mintUI);
import 'mint-ui/lib/style.min.css';
import '../statics/css/site.css';
Vue.use(vueRouter);
Vue.use(vueResource);  
//加载图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
import moment from 'moment';
Vue.filter('fmtdate',function(input,datefmtstring){
	return moment(input).format(datefmtstring);
});

//定义路由规则对象
import App from './App.vue'
import Home from './components/Home/Home.vue';
import member from './components/member/member.vue';
import shopcar from './components/shopcar/shopcar.vue';
import search from './components/search/search.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/info.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodscomment from './components/goods/comment.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import login from './components/login/login.vue';
import setorder from './components/order/setorder.vue';
let router = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
	
		{name:'root',path:'/',redirect:'/Home'}, 
		{name:'home',path:'/Home',component:Home},
		{name:'member',path:'/member',component:member},
		{name:'shopcar',path:'/shopcar',component:shopcar},
		{name:'search',path:'/search',component:search},
		{name:'newslist',path:'/news/newslist',component:newslist}, 
		{name:'newsinfo',path:'/news/newsinfo/:id',component:newsinfo}, 
		{name:'photolist',path:'/photo/photolist',component:photolist}, 
		{name:'photoinfo',path:'/photo/info/:id',component:photoinfo}, 
		{name:'goodslist',path:'/goods/goodslist',component:goodslist}, 
		{name:'goodsinfo',path:'/goods/goodsinfo/:id',component:goodsinfo},
		{name:'goodscomment',path:'/goods/comment/:id',component:goodscomment}, 
		{name:'goodsdesc',path:'/goods/goodsdesc/:id',component:goodsdesc} ,
		{name:'login',path:'/login',component:login},
		{name:'setorder',path:'/order/setorder',component:setorder} 

	]
});

//使用router
new Vue({
	el:'#app',
	router,
	render:c=>c(App)
});