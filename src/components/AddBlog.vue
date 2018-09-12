<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <form>
      <label>博客标题</label>
      <input type="text" v-model="blog.pushTitle" required />

      <label>博客内容</label>
      <textarea v-model="blog.pushCont"></textarea>

      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories">
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories">
        <label>Angular4</label>
        <input type="checkbox" value="Angular4" v-model="blog.categories">
      </div>
      <label>作者:</label>
      <select v-model="blog.author">
        <option v-for="author in authors">
          {{author}}
        </option>
      </select>
      <button @click="addNews">添加博客</button>
    </form>
  </div>
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
    }
  },
	computed:{
			...mapState([
					'pushShow'
			])
	},
  methods:{
			// 发布
			addNews:function(){
					this.$store.dispatch('pushNews',[this.blog.pushTitle,this.blog.pushCont,this.blog.categories,this.blog.author])
					.then(res=>{
						this.$router.push({path:'/'}); 
					})
			}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog *{
  box-sizing: border-box;
}

#add-blog{
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label{
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],textarea,select{
  display: block;
  width: 100%;
  padding: 8px;
}

textarea{
  height: 200px;
}

#checkboxes label{
  display: inline-block;
  margin-top: 0;
}

#checkboxes input{
  display: inline-block;
  margin-right: 10px;
}

button{
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

#preview{
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}

h3{
  margin-top: 10px;
}

</style>
