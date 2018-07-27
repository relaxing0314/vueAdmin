<template>
  <div class="markdown-wrap">
    <code class="markdown-code">Markdown is based on
      <a href="https://github.com/sparksuite/simplemde-markdown-editor" target="_blank">simplemde-markdown-editor</a> ，Simply encapsulated in Vue.
      <a target="_blank" href="https://segmentfault.com/a/1190000009762198#articleHeader14">
        相关文章 </a>
    </code>
    <div class="editor-container">
      <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :zIndex="20"></markdown-editor>
    </div>
    <el-button @click="markdown2Html" style="margin-top:80px;" type="primary" icon="el-icon-document">To HTML</el-button>
    <div v-html="html"></div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/markdown/markdown.vue'

const content = `
**this is test**

* vue
* element
* webpack

## Simplemde
`
export default {
  name: 'markdown-demo',
  components: { MarkdownEditor },
  data() {
    return {
      content: content,
      html: ''
    }
  },
  methods: {
    markdown2Html() {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        this.html = converter.makeHtml(this.content)
      })
    }
  }
}
</script>
<style lang="scss" scope>
@import '~scss_vars';
  .markdown-wrap{
    .markdown-code{
      background-color:$color-light-gray;
      padding: 15px 16px;
      margin: 20px 0;
      display: block;
      line-height: 36px;
      font-size: 15px;
      font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    }
    p {
      margin: 1em 0;
    }
    strong, b {
      font-weight: bold;
    }
    ul, menu, dir {
      display: block;
      list-style-type: disc;
      margin: 1em 0;
      padding-left: 40px;
    }
    li {
      list-style-type: disc;
      text-align: -webkit-match-parent;
    }
    h2 {
      font-size: 1.5em;
      margin: 0.83em 0;
      font-weight: bold;
    }
    a{
      color:$color-primary;
    }
  }
</style>
