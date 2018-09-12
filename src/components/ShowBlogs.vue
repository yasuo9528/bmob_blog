<template>
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索">
    <div v-for="(blog,index) in getCont" :key="index" class="single-blog">
    	<router-link v-bind:to="'/blog/' + blog.id">
        <h2 v-rainbow>{{blog.attributes.newTitle}}</h2>
      </router-link>

    	<article>
    		{{blog.attributes.newContent}}
    	</article>
			<p v-for="(f,index) in blog.attributes.newCategories" :key="index">
					{{f}}
			</p>
    </div>
  </div>
</template>

<script>
import stroe from 'vuex'
import { mapState,mapActions} from 'vuex'
export default {
  name: 'show-blogs',
  data(){
  	return {
  		search:""
  	}
  },
	methods:{
			/* ...mapActions([
				'getallState'
			]) */
	},
  computed:{
			...mapState([
					'getCont'
			])
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
  			// el.style.color = "#" + Math.random().toString(16).slice(2,8);
  		}
  	}
  }
}
</script>

<style>
#show-blogs{
	max-width: 800px;
	margin: 0 auto;
}

.single-blog{
	padding: 20px;
	margin: 20px 0;
	box-sizing: border-box;
	background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a{
  color: #444;
  text-decoration: none;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}


</style>
