<template>
  <div class="article-detail">
    <div v-if="article">
      <header>
        <a href="javascript:history.go(-1)" class="back" @click="back">返回上一页</a>
        <h1>文章详情页</h1>
        <h2>{{article.title}}</h2>
      </header>
      <main>
        <div class="content-wrap" v-html="article.content"></div>
      </main>
    </div>
    <div v-else>
      <h1>文章不存在</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-detail',
  data () {
    return {
      article: null
    }
  },
  methods: {
    getArticleDetail () {
      let id = this.$route.query.id
      let that = this
      this.axios.get('/article/detail?id=' + id)
        .then(res => {
          console.log('文章', res.data)
          that.article = res.data
        })
    },
    back () {
      console.log('返回上一页')
    }
  },
  beforeCreate () {
    console.log('ArticleDetail beforeCreate')
  },
  created () {
    console.log('ArticleDetail created')
  },
  beforeMount () {
    console.log('ArticleDetail beforeMount')
    this.getArticleDetail()
  },
  mounted () {
    console.log('ArticleDetail mounted')
  },
  beforeDestroy () {
    console.log('ArticleDetail beforeDestroy')
  },
  destroyed () {
    console.log('ArticleDetail destroyed')
  }
}
</script>

<style lang="scss" scoped>
  .article-detail{
    .img{
      width: 500px;
      display: block;
      margin: 30px auto 0;
    }
    .content-wrap {
      width: 1200px;
    }
  }
</style>

<style lang="scss">
  .article-detail {
    text-align: left;
    .content-wrap {
      width: 1200px;
      img {
        max-width: 100%;
      }
    }
  }
</style>
