<template>
  <div class="article">
    <header>
      <nav>
        <button @click="getArticle">获取文章列表</button>
      </nav>
    </header>
    <main>
      <ul>
        <li v-for="item in articles" :key="item.id">
          <h1>{{ item.title }}</h1>
          <p>{{ item.content }}</p>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getArticle () {
      let that = this
      this.axios.get('http://127.0.0.1/api/article')
        .then(res => {
          console.log(res)
          that.articles = res.data
        })
    }
  },
  beforeMount () {

  }

}
</script>

<style scoped>

</style>
