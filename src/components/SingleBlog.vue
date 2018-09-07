<template>
	<div id="single-blog">
		<h1>{{blogTitle}}</h1>
		<article>{{blogContent}}</article>
		<p>作者: {{blogAuthor}}</p>
		<p>创作时间: {{blogCreatedAt}}</p>
		<p>分类:</p>
		<ul>
			<li v-for="category in blogCategories">
				{{category}}
			</li>
		</ul>
		<button @click="deleteSingleBlog()">删除</button>
		<router-link :to="'/edit/' + id">编辑</router-link>
	</div>
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
		methods:{
			...mapActions([
				'getNews'
			])
		},
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
			this.$store.dispatch('getNews',this.id)
		},
		methods:{
			
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
</style>