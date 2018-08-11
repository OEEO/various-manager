<template>
  <div class="post">
    <div class="editor" v-if="editorShow">
      <el-input v-model="title" placeholder="请输入标题" class="title"></el-input>
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
      >
      </quill-editor>
      <el-button type="primary" @click="submitPost">提交文章</el-button>
    </div>
    <div v-else>
      <h1>提交成功</h1>
      <el-button @click="editorShow = true">再改一篇</el-button>
    </div>
  </div>
</template>

<script>
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)

export default {
  components: {quillEditor},
  props: ['profiles'],
  data () {
    return {
      content: '',
      title: '',
      editorShow: true,
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'img',
            action: `https://www.wangchaozhen.com/api/uploads/post?username=${this.profiles.username}`,
            response: (res) => {
              console.log(res.url)
              return res.url
            }
          },
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
        }
      }
    }
  },
  methods: {
    submitPost () {
      this.axios.post('/post/add', {
        title: this.title,
        content: this.content
      })
        .then(res => {
          console.log(res.data)
          this.editorShow = false
          this.content = ''
          this.title = ''
        })
        .catch(err => {
          console.err(err)
        })
    }
  },
  updated () {
    console.log(this.content)
  }
}
</script>

<style lang="scss">
  .post{
    .editor {
      margin-top: 20px;
    }
    .title {
      margin-bottom: 20px;
    }
    .ql-editor{
      min-height: 400px;
    }
  }
</style>
