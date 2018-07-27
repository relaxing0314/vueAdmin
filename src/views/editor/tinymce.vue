<template>
  <div class="editor-wrap">
    <div>
      <tinymce :height="300" v-model="content"></tinymce>
    </div>
    <div class="editor-content" v-html="content"></div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce/index'

export default {
  name: 'tinymce-demo',
  components: { Tinymce },
  data() {
    return {
      content:
      `<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="//www.tinymce.com/images/glyph-tinymce@2x.png" alt="TinyMCE Logo" width="110" height="97" /><ul>
        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>
      </ul>`
    }
  }
}
</script>
<style lang="scss" scope>
.editor-wrap{
  margin-top: 20px;
  h1 {
    display: block;
    font-size: 2em;
    -webkit-margin-before: 0.67em;
    -webkit-margin-after: 0.67em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
  }
  a {
    color: #1478F0;
  }
  a:-webkit-any-link:read-write {
    cursor: text;
  }
  a:-webkit-any-link {
    cursor: pointer;
    text-decoration: underline;
  }
  p {
    margin: 1em 0;
  }
  ul{
    li{
      line-height:1.3;
    }
  }
}
</style>


