import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
	/* 
		blogID            博客ID
		blogTitle         博客标题
		blogConent        博客内容
		blogCategories    博客分类
		blogAuthor        博客作者
	 */
	blogID:'',
	blogTitle:'',
	blogConent:'',
	blogCategories:'',
	blogAuthor:''
}

const mutations = {
	
}

const actions = {
	
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})