<template>
  <el-dialog center :title="data.title"
    :width="data.width"
    v-loading="listLoading"
    :visible.sync="data.isVisible"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form ref="dialogForm"
      :model="data.form"
      :rules="data.rules"
      :label-width="data.labelWidth"
    >
      <el-form-item v-for="(val,nam) in data.form"
        :key="nam"
        :label="setLabel(data.label[nam])"
        :prop="nam"
      >
        <p v-if="data.formType[nam] === 'p'">
          <span>{{val}}</span>
          <span class="copyName"
            v-clipboard="data.form[nam]"
            @success="handleSuccess"
            @error="handleError"
          >【复制】</span>
        </p>

        <el-input v-if="data.formType[nam] === 'input'"
          v-model="data.form[nam]"
        ></el-input>

        <el-input-number v-if="data.formType[nam] === 'inputNumber'"
          v-model="data.form[nam]"
          :min="data.fromTypeList[nam].min"
          :max="data.fromTypeList[nam].max"
        ></el-input-number>

        <el-date-picker type="date"
          v-if="data.formType[nam] === 'date'"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          v-model="data.form[nam]"
          placeholder="选择日期"
        ></el-date-picker>

        <el-time-picker type="fixed-time"
          v-if="data.formType[nam] === 'time'"
          placeholder="选择时间"
          v-model="data.form[nam]"
        ></el-time-picker>

        <el-date-picker type="datetimerange"
          v-if="data.formType[nam] === 'dateTime'"
          v-model="data.form[nam]"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>

        <el-input type="textarea"
          v-if="data.formType[nam] === 'textarea'"
          v-model="data.form[nam]"
        ></el-input>

        <el-radio-group v-if="data.formType[nam] === 'radio'"
          v-model="data.form[nam]"
        >
          <el-radio class="radio"
            v-for="(item,index) in data.fromTypeList[nam]"
            :key="item.label"
            :label="item.label"
          >
            {{item.dld}}
          </el-radio>
        </el-radio-group>

        <el-select placeholder="请选择"
          v-if="data.formType[nam] === 'select'"
          v-model="data.form[nam]"
        >
          <el-option
            v-for="(item,index) in data.fromTypeList[nam]"
            :key="item.label"
            :label="item.label"
            :value="item.dld"
          ></el-option>
        </el-select>

        <el-switch
          v-if="data.formType[nam] === 'switch'"
          v-model="data.form[nam]"
        ></el-switch>

        <el-checkbox-group
          v-if="data.formType[nam] === 'checkbox'"
          v-model="data.form[nam]"
        >
          <el-checkbox
            v-for="(item,index) in data.fromTypeList[nam]"
            :key="item.label"
            :label="item.label"
            :name="nam"
          ></el-checkbox>
        </el-checkbox-group>

      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="popSubmit(data.event)">确定</el-button>
      <el-button @click.native="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>
<script type="text/ecmascript-6">
import {setName,Message} from '../../common/js/util';
  export default{
    data(){
      return {
        copyData: 'copy data'
      }
    },
    props:{
      data:{
        type:Object,
        default:{
          title:"",
          width:"40%",
          labelWidth:"100px",
          event:"",
          isVisible:false,
          id:"",
          form:{},
          rules:{},
          label:{},
          formType:{},
          fromTypeList:{},
          isDisabledList:{}
        }
      },
      listLoading:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      setLabel(val){
        return setName(val);
      },
      inputKey(val1,val2){
        return `${val1}${val2}`;
      },
      //复制
      handleSuccess(e) {
        const that = this;
        this.copyData = e.text;
        Message(that,false,"copy success",1);
      },
      handleError(e) {
        const that = this;
        Message(that,false,"copy error",0);
        console.log(e);
      },
      popSubmit(type){
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            this.$emit("formSub",type);
          } else {
            return false;
          }
        });
      },
      handleClose(){
        this.$emit("resetState");
      }
    }
  };
</script>
<style lang="scss">
  @import '~scss_vars';
  .copyName{
    color:$color-primary;
    cursor:pointer;
  }
</style>
