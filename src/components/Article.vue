<template>
  <div class="article">
    <header>
      <h2>文章列表</h2>
    </header>
    <main>
      <ul>
        <li
          class="article-item"
          v-for="item in articles"
          :key="item.id"
          @click="goToArticleDetail(item.id)">
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
      this.axios.get('/article')
        .then(res => {
          console.log(res)
          that.articles = res.data
        })
    },
    goToArticleDetail (id) {
      this.$router.push({
        path: '/ArticleDetail',
        query: {
          id: id
        }
      })
    }
  },
  beforeCreate () {
    console.log('Article beforeCreate')
  },
  created () {
    console.log('Article created')
  },
  beforeMount () {
    this.getArticle()
  },
  mounted () {
    console.log('Article mounted')
  },
  beforeUpdate () {
    console.log('Article beforeUpdate')
  },
  updated () {
    console.log('Article updated')
  },
  beforeDestroy () {
    console.log('Article beforeDestroy')
  },
  destroyed () {
    console.log('Article destroyed')
  }

}
</script>

<style lang="scss" scoped>
  .article{
    .article-item{
      cursor: pointer;
      list-style: none;
      width: 500px;
      margin: 20px auto 0;
      padding: 20px;
      background-color: #aaa;
    }
  }
</style>
