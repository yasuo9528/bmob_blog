<template>
	<el-card class="box-card clearfix" v-theme:position="'wide'">
		<el-row>
			<el-col :span="18" class="breadcrumb">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">博客</el-breadcrumb-item>
					<el-breadcrumb-item>博客详情</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			<el-row type="flex" justify="end">
			<el-col :span="6">
				<router-link :to="'/'"><el-button type="primary" size="mini" icon="el-icon-back"></el-button></router-link> 
			</el-col>
			</el-row>
		</el-row>
		<h2>{{blogTitle}}</h2>
		<hr>
		<el-row type="flex" justify="start">
			<el-col :span="12">
				<el-tag size="mini" type="info">{{blogAuthor}}</el-tag>
				<el-tag size="mini" type="success">{{blogCreatedAt}}</el-tag>
				<el-tag size="mini">
					<span v-for="category in blogCategories">
						{{category}}
					</span>
				</el-tag>
			</el-col>
		</el-row>
		<p class="text-regular">{{blogContent}}</p>
		<el-row type="flex" justify="start">
			<el-col :span="12" :offset="20">
			<router-link :to="'/edit/' + id"><el-button type="primary" size="mini" icon="el-icon-edit"></el-button></router-link>
			<el-button type="danger" size="mini" icon="el-icon-delete" @click="removeNew(id)"></el-button>
		</el-col>
		</el-row>	  
	</el-card>
</template>

<script>
	import stroe from 'vuex'
	import { mapState,mapActions} from 'vuex'
	export default{
		name:"single-blog",
		data(){
			return{
				id:this.$route.params.id
			}
		},
		/* methods:{
			...mapActions([
				'getNews'
			])
		}, */
		computed:{
			...mapState([
				'blogID',
				'blogTitle',
				'blogContent',
				'blogCategories',
				'blogAuthor',
				'blogCreatedAt'
			])
		},
		created(){
			this.$store.dispatch('getNews',this.id);
		},
		methods:{
			// 删除文章
			removeNew: function(type){
				this.$store.dispatch('removeNew',type).then(res=>{
					this.$router.push({path:'/'}); 
				})
			}
		}
	}
</script>
<style>
	#single-blog{
		max-width: 960px;
		margin: 0 auto;
		padding: 20px;
		background: #eee;
		border: 1px dotted #aaa;
	}
	[v-cloak]{ display:none}
</style>