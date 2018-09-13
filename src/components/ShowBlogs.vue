<template>
	<el-card v-theme:position="'wide'">
		<h1>博客总览</h1>
		<el-row>
			<el-col :span="12" :offset="12">
				<el-input placeholder="搜索Blog" suffix-icon="el-icon-search" v-model="search" class="search"></el-input>
			</el-col>
		</el-row>
			<el-card class="box-card" v-for="(blog,index) in getCont" :key="index"  shadow="hover">
					<router-link v-bind:to="'/blog/' + blog.id"><h3 v-rainbow>{{blog.attributes.newTitle}}</h3></router-link>
					<div class="text item">
						{{blog.attributes.newContent}}
					</div>
					<el-row type="flex" justify="start" class="card-tag">
						<el-col :span="12">
							<el-tag type="success" size="mini" v-for="(f,index) in blog.attributes.newCategories" :key="index">{{f}}</el-tag>
						</el-col>
					</el-row>
			</el-card>
	</el-card>
</template>

<script>
import stroe from 'vuex'
import { mapState,mapActions,mapGetters} from 'vuex'
export default {
  name: 'show-blogs',
  data(){
  	return {
  		search:""
  	}
  },
	methods:{
			...mapActions([
				'getallState'
			])
	},
  computed:{
			...mapState([
					'getCont',
			]),
			/* ...mapGetters(['getCont',
			]) */
  },
	created(){
			this.$store.dispatch('getallState',{
				tabName:'news'
			})
	},
  filters:{
  	toUppercase(value){
  		return value.toUpperCase();
  	}
  },
  directives:{
  	'rainbow':{
  		bind(el,binding,vnode){
				el.style.color = "#" + Math.random().toString(16).slice(2,8);
  		}
  	}
  }
}
</script>

<style>
.box-card,.search{
	margin-bottom: 20px;
}
.card-tag {
	margin-top: 10px;
}
.card-tag .el-tag{
	margin-right: 10px;
}
a{
	text-decoration: none !important;
}

</style>
