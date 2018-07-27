<template>
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true">
      <el-form-item :label="setTit(powerList.tit)">
        <el-checkbox-group v-for="(formI,nameI) in powerList.form" :key="nameI" v-model="powerList.form[nameI]">
          <el-checkbox v-for="(item,index) in powerList.checkVal" :key="item" :label="item" :name="nameI" @change="handleChange(item,$event)">{{powerList.checkName[item]}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
  import {setName,filterArr,getParent} from '../../common/js/util';
  export default {
    props:{
      powerList:{
        type:Object,
        default:{
          tit:"",
          form:{},
          checkVal:[],
          checkName:[]
        }
      }
    },
    methods: {
      setTit(val){
        return setName(val);
      },
      isHave(parentVal,obj){
        let ishas = false;
        for(let v in obj){
          for(let t=0;t<obj[v].length;t++){
            if(obj[v][t] === parentVal){
              ishas = true;
              break
            }else{
              ishas = false;
            }
          }
        }
        return ishas;
      },
      handleChange(val,event){
        let _val = val;
        const ishas = this.isHave(val,this.powerList.form);
        if(val.indexOf("_") == 0 && ishas && event){
          _val = val.split("_").join("");
          let parent1 = getParent(this.powerList.checkVal,_val);
          if(!this.isHave(parent1,this.powerList.form)){
            this.$emit("addCheckVal",parent1)
          }
        }else if(val.indexOf("_") == 0 && !ishas){
          _val = val.split("_").join("");
          let parent2 = getParent(this.powerList.checkVal,_val);
          const childArr = filterArr(this.powerList.form,parent2);
          if(childArr.length == 0){
            this.$emit("removeParent",parent2)
          }
        }else if(val.indexOf("_") > 0 && ishas){
          this.$emit("removeParent",val)
        }
      },
      updated(){
        for(let v in this.powerList.form){
          this.powerList.form[v].map(t => {
            this.handleChange(t);
          })
        }
      }
    }
  }
</script>
<style lang="scss">

</style>
