<template>
  <div class="post">
    <div class="quill-wrap">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
      >
      </quill-editor>
    </div>
  </div>
</template>

<script>
Quill.register('modules/ImageExtend', ImageExtend)
import {quillEditor, Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

Quill.register('modules/ImageExtend', ImageExtend)
export default {
  components: {quillEditor},
  data () {
    return {
      content: '',
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: 'img',
            action: 'http://127.0.0.1/api/newPost',
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
  }
}
</script>

<style lang="scss">
  .post{
    .ql-editor{
      min-height: 400px;
    }
  }
</style>
