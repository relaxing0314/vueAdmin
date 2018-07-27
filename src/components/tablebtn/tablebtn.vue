<template>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item v-for="(item,index) in btnlists" :key="item.name">
          <el-button v-if="item.type === 'button'" type="primary" @click="handleClick(item)" :disabled="item.isDisabled">{{item.name}}</el-button>
          <el-input v-if="item.type === 'input'" v-model="item.value" :placeholder="item.name" :disabled="item.isDisabled">
            <el-button slot="append" type="primary" @click="handleClick(item)" :disabled="item.isDisabled" class="input-append-button">{{item.btn}}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-col>
</template>
<script type="text/ecmascript-6">
  export default{
    props:{
      btnlists:{
        type:Array,
        default:[
          {event:"",name:"",value:"",isDisabled:false,type:"",btn:"",startDis:false}
        ]
      }
    },
    methods:{
      handleClick(data){
        this.$emit("tableClick",data);
      }
    }
  };
</script>
<style lang="scss">
@import '~scss_vars';

.input-append-button{
  border-radius:0px 4px 4px 0px;
  background-color:$color-primary !important;
  color:$color-white !important;
}
.input-append-button:hover{
  background-color:rgba(32,160,255,0.8) !important;
  color:$color-white !important;
}
</style>
