<template>
  <div id="add-blog">
    <h2>编辑博客</h2>
    <form>
      <label>博客标题</label>
      <input type="text" v-model="title" required />

      <label>博客内容</label>
      <textarea v-model="content"></textarea>

      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="categories">
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="categories">
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="categories">
        <label>Angular4</label>
        <input type="checkbox" value="Angular4" v-model="categories">
      </div>
      <label>作者:</label>
      <select v-model="author">
        <option v-for="author in authors">
          {{author}}
        </option>
      </select>
      <button @click="editMod()">编辑博客</button>
    </form>
  </div>
</template>

<script>
import stroe from 'vuex'
	import { mapState,mapActions} from 'vuex'
	export default{
		name:"single-blog",
		data(){
			return{
				id:this.$route.params.id,
				title:this.$store.state.blogTitle,
				content:this.$store.state.blogContent,
				categories:this.$store.state.blogCategories,
				author:this.$store.state.blogAuthor,
				authors:["Hemiah","Henry","Bucky"] 
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
				editMod:function(){
					console.log(this.title,this.content,this.categories,this.author);
						this.$store.dispatch('editMod',[this.id,this.title,this.content,this.categories,this.author]).then(res=>{
							this.$router.push({path:'/'}); 
						})
				}
		},
		watch:{
			blogTitle(){
				this.title = this.$store.state.blogTitle
			},
			blogContent(){
				this.content = this.$store.state.blogContent
			},
			blogCategories(){
				this.categories = this.$store.state.blogCategories
			},
			blogAuthor(){
				this.author = this.$store.state.blogAuthor
			}
		},
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

