<template>
  <div class="json-wrap">
    <code class="json-code">JsonEditor is base on  <a href="https://github.com/codemirror/CodeMirror" target="_blank">CodeMirrorr</a> , lint base on json-lint </code>
    <div class="editor-container">
      <json-editor ref="jsonEditor" v-model="value"></json-editor>
    </div>
  </div>
</template>

<script>
import JsonEditor from '@/components/JsonEditor/JsonEditor.vue'

const jsonData = '[{"car_type_name":"宝马M6 2013款 4.4T 双离合 Gran Coupe","is_index":0,"create_time":"2018-06-20 14:27:21","apply_status":2,"apply_time":"2018-06-20 17:19:51","sources_id":104267,"purchase_sales_num":0,"car_type":2,"is_delete":false,"financeList":[{"month_pay":2.00,"down_payments":1.00,"term":456,"id":95,"car_id":1,"bond":123.00,"is_delete":false}],"purchase_num":2,"update_time":"2018-06-20 16:33:49","update_user":1,"purchase_tax":2.00,"car_price":2.00,"car_brand":"宝马","car_line":"宝马M","id":40,"create_user":1,"purchase_date":"2018-06-20 14:27:21","audit_result":0,"financial_products":"95;96","insurance_premium":0.00,"channel_id":21}]';

export default {
  name: 'jsonEditor-demo',
  components: { JsonEditor },
  data() {
    return {
      value: JSON.parse(jsonData)
    }
  }
}
</script>
<style lang="scss" scope>
@import '~scss_vars';
.json-wrap{
  .json-code{
    background-color:$color-light-gray;
    padding: 15px 16px;
    margin: 20px 0;
    display: block;
    line-height: 36px;
    font-size: 15px;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  }
  a{
    color:$color-primary;
  }
}
.editor-container{
  position: relative;
  height: 100%;
}
</style>

