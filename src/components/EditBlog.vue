<template>
	<el-card id="edit-blog" v-theme:position="'wide'">
		<el-row>
			<el-col :span="18" class="breadcrumb">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">博客</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blog/'+id }">博客详情</el-breadcrumb-item>
					<el-breadcrumb-item>编辑博客</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			<el-row type="flex" justify="end">
			<el-col :span="6">
				<router-link :to="'/blog/'+id"><el-button type="primary" size="mini" icon="el-icon-back"></el-button></router-link> 
			</el-col>
			</el-row>
		</el-row>
		<h1>编辑博客</h1>
		<el-form :model="blog" :rules="rules" ref="blog" label-width="80px">
			<el-form-item label="博客标题" prop="title">
				<el-input v-model="blog.title"></el-input>
			</el-form-item>
			<el-form-item label="博客内容" prop="content">
				<el-input type="textarea" :rows="7" v-model="blog.content"></el-input>
			</el-form-item>
			<el-form-item label="所属技术" prop="categories">
				<el-checkbox-group v-model="blog.categories">
					<el-checkbox label="Vue.js" name="type"></el-checkbox>
					<el-checkbox label="Node.js" name="type"></el-checkbox>
					<el-checkbox label="React.js" name="type"></el-checkbox>
					<el-checkbox label="Angular4" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="作者" prop="author">
				<el-select v-model="blog.author" placeholder="请选择作者">
					<el-option
						v-for="(author,index) in authors"
						:key="index"
						:label="author"
						:value="author"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :plain="true" @click="editMod('blog')">立即编辑</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
import stroe from 'vuex'
	import { mapState,mapActions} from 'vuex'
	export default{
		name:"single-blog",
		data(){
			return{
				blog:{
					title:this.$store.state.blogTitle,
					content:this.$store.state.blogContent,
					categories:this.$store.state.blogCategories,
					author:this.$store.state.blogAuthor
				},
				id:this.$route.params.id,
				authors:["Hemiah","Henry","Bucky"],
				rules: {
					title: [
								{ required: true, message: '请输入博客标题', trigger: 'blur' },
								{ min: 3, message: '长度大于3个字符', trigger: 'blur' }
							],
					content:[
								{ required: true, message: '请输入博客内容', trigger: 'blur' },
								{ min: 3, message: '长度大于3个字符', trigger: 'blur' }
							],	
					categories: [
						{ type: 'array', required: true, message: '请至少选择一个', trigger: 'change' }
							],
					author: [
								{ required: true, message: '请选择作者', trigger: 'change' }
							],
				}
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
				editMod:function(formName){
						this.$refs[formName].validate((valid) => {
							if (valid) {
								
								this.$store.dispatch('editMod',{ blog:this.blog})
								.then(res=>{	
									this.$message({
										message: '您的博客编辑成功',
										type: 'success'
									});
									//this.$router.push({path: '/blog/'+this.id}) 
								})
							} else {
								console.log('error submit!!');
								return false;
							}
						});
				}
		},
		watch:{
			blogTitle(){
				this.blog.title = this.$store.state.blogTitle
			},
			blogContent(){
				this.blog.content = this.$store.state.blogContent
			},
			blogCategories(){
				this.blog.categories = this.$store.state.blogCategories
			},
			blogAuthor(){
				this.blog.author = this.$store.state.blogAuthor
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

