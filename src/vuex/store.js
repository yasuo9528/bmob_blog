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
	blogContent:'',
	blogCategories:'',
	blogAuthor:'',
	blogCreatedAt:'',
	// -- content 首页文章条目 
	getCont: ''
}

const mutations = {
	login:()=>{
		Bmob.initialize("3cd7c28fa3645af69208f1de1c15b702", "d662d7f0a8e85b40cf225579c1f97496");
	},
	getallState:(state,type)=>{
		var GameScore = Bmob.Object.extend(type.tabName);
		var query = new Bmob.Query(GameScore);
		//type.getlist ? query.limit(6*type.getlist) : ''
		//type.className != '全部' ? query.equalTo('newTag',type.className) : ''
		query.descending('createdAt')
		query.find({
				success: results => {
						state.getCont = results
				},
				error: error => {
						console.log("查询失败: " + error.code + " " + error.message);
				}
		});
	},
	getNews:(state,type)=>{
		var news = Bmob.Object.extend("news");
		var query = new Bmob.Query(news);
		query.get(type, {
		success: function(result) {
				state.blogID = result.id;
				state.blogTitle = result.get("newTitle");
				state.blogContent = result.get("newContent");
				
				state.blogCategories = result.get("newCategories")
				state.blogAuthor = result.get("newAuthors");
				state.blogCreatedAt=result.createdAt;
		},
		error: function(object, error) {
				
		}
		})
	}
}

const actions = {
	getallState:({commit},type)=>{
		commit('login')
		commit('getallState',type)
	},
	getNews:({commit},type)=>{
		commit('login')
		commit('getNews',type)
	}
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})