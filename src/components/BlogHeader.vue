<template>
	<el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal"
	background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
		<el-menu-item index="/">博客</el-menu-item>
		<el-menu-item index="/add">写博客</el-menu-item>	
	</el-menu>
</template>

<script>
	export default{
		name:"blog-header"
	}
</script>

<style scoped>

</style>