<template>
  <div class="article">
    <header>
      <el-button type="success" @click="createArticle">写文章</el-button>
    </header>
    <main>
      <div v-if="!create">
        <h2>文章列表</h2>
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
      </div>
      <div v-else>
        <div>
          <label for="newTitle">标题</label>
          <el-input placeholder="请输入标题" id="newTitle" name="newTitle" v-model="title"></el-input>
        </div>
        <div>
          <label for="content">正文</label>
          <el-input type="textarea" placeholder="请输入内容" name="content" id="content" :rows="10" v-model="content"></el-input>
        </div>
        <div>
          <el-button type="danger" @click="submitNewArticle">提交</el-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      articles: [],
      create: false,
      title: '',
      content: ''
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
    },
    createArticle () {
      this.create = true
    },
    submitNewArticle () {
      this.axios.post('/createArticle', {
        title: this.title,
        content: this.content
      })
        .then(res => {
          console.log(res)
          if (res.data === 'success') {
            console.log('发表成功')
          }
        })
        .catch(error => {
          console.log(error)
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
