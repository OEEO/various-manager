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
            v-for="(item, index) in articles"
            v-if="articles.length > 0"
            :key="item._id"
            @click="goToArticleDetail(item._id)"
            @mouseenter="articleEnter(index)"
            @mouseleave="articleLeave">
            <h1>{{ item.title }}</h1>
            <p>{{ item.content }}</p>
            <el-button
              type="danger"
              class="del-article-btn"
              v-show="curIndex === index"
              @click.stop="delThisArticle(item._id)">删除</el-button>
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
  props: ['notCreate'],
  data () {
    return {
      articles: [],
      create: false,
      title: '',
      content: '',
      delBtnShow: false,
      curIndex: ''
    }
  },
  methods: {
    articleEnter (index) {
      this.curIndex = index
    },
    articleLeave (e) {
      this.curIndex = ''
    },
    getArticle () {
      let that = this
      this.axios.get('/article/user')
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
      let that = this
      this.axios.post('/article/add', {
        title: that.title,
        content: that.content
      })
        .then(res => {
          console.log('发表成功')
          that.getArticle()
          that.create = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    delThisArticle (id) {
      console.log(id)
      this.axios.post('/article/del', {
        id: id
      })
        .then(res => {
          console.log('删除成功')
          this.getArticle()
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  beforeMount () {
    console.log('beforeMount')
    this.getArticle()
  }
}
</script>

<style lang="scss" scoped>
  .article{
    .article-item{
      position: relative;
      cursor: pointer;
      list-style: none;
      width: 500px;
      margin: 20px auto 0;
      padding: 20px;
      background-color: #aaa;
      .del-article-btn {
        position: absolute;
        right: 30px;
        top: 30px;
      }
    }
  }
</style>
