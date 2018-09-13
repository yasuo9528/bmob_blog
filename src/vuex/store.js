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
		blogCreatedAt     博客创作时间
	 */
	blogID:'',
	blogTitle:'',
	blogContent:'',
	blogCategories:'',
	blogAuthor:'',
	blogCreatedAt:'',
	// -- content 首页文章条目 
	getCont: '',
	pushShow:false
}
const getters = {
        //getCont: state => state.getCont
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
						state.getCont = results;
						//重置博客详细
						state.blogID = '';
						state.blogTitle = '';
						state.blogContent = '';
						state.blogCategories = '';
						state.blogAuthor = '';
						state.blogCreatedAt='';
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
	},
	pushNews: (state,type) => {
			if(type[0] == '' && type[1] == ''){
				return;
			}
			console.log(type)
			var Diary = Bmob.Object.extend("news");
			var diary = new Diary();
			diary.set("newTitle",type[0]);
			diary.set("newContent",type[1]);
			diary.set("newCategories",type[2]);
			diary.set("newAuthors",type[3]);
			diary.save(null, {
			success: function(result) {
					if(!result) return
			},
			error: function(result, error) {
				
			}
			});
	},
	removeNew: (state,type) => {
		var Diary = Bmob.Object.extend("news");
		var query = new Bmob.Query(Diary);
		query.get(type, {
			success: function(object) {
				// The object was retrieved successfully.
				object.destroy({
					success: function(deleteObject) {
						for(let i in state.getCont){
								if(state.getCont[i].id == deleteObject.id){
									state.getCont.splice(i,1)
								}
						}
						console.log('删除成功');
					},
					error: function(object, error) {
						error ? console.log('删除失败') : '';
					}
				});
			},
			error: function(object, error) {
				error ? console.log("query object fail") : '';
			}
		});
	},
	editMod: (state,type) => {
		var Diary = Bmob.Object.extend("news");
		var query = new Bmob.Query(Diary);
		query.get(type.id, {
				success: function(result) {
						/* for(let i in state.getCont){	
							
							if(state.getCont[i].id == type[0]){
								 console.log(type[1])
								
							state.getCont[i].attributes.newTitle = type[1];
							state.getCont[i].attributes.newContent = type[2];
							
							}
						} */
						result.set('newTitle', type.blog.title);
						result.set('newContent', type.blog.content);
						result.set('newCategories', type.blog.categories);
						result.set('newAuthors', type.blog.authors);
						result.save();
				},
				error: function(object, error) {
						state.mesState='err';state.mesTitle='错误'
				}
		});
	},
}

const actions = {
	getallState:({commit},type)=>{
		commit('login')
		commit('getallState',type)
	},
	getNews:({commit},type)=>{
		commit('login')
		commit('getNews',type)
	},
	pushNews: ({commit},type,state) => {
		commit('login')
		commit('pushNews',type)
	},
	// 删除文章
	removeNew: ({commit},type) => {
		commit('login')
		commit('removeNew',type)
	},
	// 编辑文章
	editMod: ({commit},type) => {
		commit('login')
		commit('editMod',type)
	},
}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})