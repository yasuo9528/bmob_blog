<template>
  <div id="app">
    <el-container>
    	<el-header class="header">
    		<blog-header></blog-header>
    	</el-header>
    	<el-main>
    		<router-view></router-view> 
    	</el-main>
    </el-container> 
  </div>
</template>

<script>
import AddBlog from './components/AddBlog'
import ShowBlogs from './components/ShowBlogs'
import BlogHeader from './components/BlogHeader'

export default {
  name: 'app',
  components: {
    AddBlog,ShowBlogs,BlogHeader
  }
}
</script>

<style>
.header {
	background-color: #545c64;
}
</style>
