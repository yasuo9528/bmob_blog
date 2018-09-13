<template>
	<el-card id="add-blog" v-theme:position="'wide'">
		<el-row>
			<el-col :span="18" class="breadcrumb">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">博客</el-breadcrumb-item>
					<el-breadcrumb-item>新增博客</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
			<el-row type="flex" justify="end">
			<el-col :span="6">
				<router-link :to="'/'"><el-button type="primary" size="mini" icon="el-icon-back"></el-button></router-link> 
			</el-col>
			</el-row>
		</el-row>
		<h1>博客总览</h1>
		<el-form :model="blog" :rules="rules" ref="blog" label-width="80px">
			<el-form-item label="博客标题" prop="pushTitle">
				<el-input v-model="blog.pushTitle"></el-input>
			</el-form-item>
			<el-form-item label="博客内容" prop="pushCont">
				<el-input type="textarea" :rows="7" v-model="blog.pushCont"></el-input>
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
				<el-button type="primary" :plain="true" @click="addNews('blog')">立即创建</el-button>
			</el-form-item>
		</el-form>
	</el-card>  
</template>

<script>
import { store,mapState } from 'vuex'
export default {
  // https://jsonplaceholder.typicode.com/
  // https://jsonplaceholder.typicode.com/posts
  name: 'add-blog',
  data () {
    return {
      blog:{
        pushTitle:"",
        pushCont:"",
        categories:[],
        author:""
      },
      authors:["Hemiah","Henry","Bucky"],
			rules: {
				pushTitle: [
							{ required: true, message: '请输入博客标题', trigger: 'blur' },
							{ min: 3, message: '长度大于3个字符', trigger: 'blur' }
						],
				pushCont:[
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
	computed:{
			...mapState([
					'pushShow'
			])
	},
  methods:{
			// 发布
			addNews:function(formName){
					this.$refs[formName].validate((valid) => {
						if (valid) {
							this.$store.dispatch('pushNews',[this.blog.pushTitle,this.blog.pushCont,this.blog.categories,this.blog.author])
							.then(res=>{
								this.$message({
									message: '您的博客发布成功',
									type: 'success'
								});
								this.$router.push({path:'/'}); 
							})
						} else {
							console.log('error submit!!');
							return false;
						}
					});
					
			}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
