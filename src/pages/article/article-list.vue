<template>
  <div class="article-list-page">
    <header>
      <h2>文章列表</h2>
    </header>
    <main>
      <ul v-if="articles.length > 0" class="article-list">
        <li
          class="article-item"
          v-for="(item, index) in articles"
          :key="item._id"
          @click="goToArticleDetail(item._id)"
          @mouseenter="articleEnter(index)"
          @mouseleave="articleLeave">
          <h2>{{ item.title ? item.title : '没有标题' }}</h2>
          <p>{{ item.author }}</p>
          <p class="content">{{ item.content }}</p>
          <el-button
            type="danger"
            class="del-article-btn"
            v-show="curIndex === index"
            @click.stop="delThisArticle(item._id)">删除</el-button>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: 'article-list',
  data () {
    return {
      articles: [],
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
      console.log('获取文章列表')
      this.axios.get('/article/all', {
        params: {
          username: '王朝',
          age: 18,
          sex: 'man'
        }
      })
        .then(res => {
          console.log('文章列表', res)
          that.articles = res.data
        })
    },
    goToArticleDetail (id) {
      this.$router.push({
        path: '/article/detail',
        query: {
          id: id
        }
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

<style lang="scss">
  .article-list-page{
    text-align: left;
    header{
      h2{
      }
    }
    .article-list {
      padding-left: 0;
    }
    .article-item{
      position: relative;
      cursor: pointer;
      list-style: none;
      margin: 20px auto 0;
      padding: 20px;
      background-color: #eee;
      .content {
        white-space:nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .del-article-btn {
        position: absolute;
        right: 30px;
        top: 30px;
      }
    }
  }
</style>
