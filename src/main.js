// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
// import Element from 'element-ui'
import store from "./vuex/store"
import App from './App'
import Routes from './routes'
//css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NormailizeCss from 'normalize.css'
//import 'vue-awesome/icons'
//import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)
//Vue.component('icon', Icon)
// Vue.use(Element)

// 自定义指令
// Vue.directive('rainbow',{
// 	bind(el,binding,vnode){
// 		el.style.color = "#" + Math.random().toString(16).slice(2,8);
// 	}
// })

Vue.directive('theme',{
	bind(el,binding,vnode){
		if (binding.value == 'wide') {
			el.style.width = "800px";
			el.style.maxWidth = "800px";
		} else if (binding.value == 'narrow') {
			el.style.maxWidth = "560px";
		}

		if (binding.arg == 'position') {
			el.style.margin = '0 auto';
		}
	}
})

// 自定义过滤器
// Vue.filter("to-uppercase",function(value){
// 	return value.toUpperCase();
// })

Vue.filter("snippet",function(value){
	return value.slice(0,100) + "...";
})

// 创建路由
const router = new VueRouter({
	routes: Routes,
	mode:"hash"
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router:router,
	store:store
})
