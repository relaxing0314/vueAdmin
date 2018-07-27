<template>
	<section>
    <PowerList :powerList="powerListData" v-on:addCheckVal="_addCheckVal" v-on:removeParent="_removeParent"></PowerList>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" border @selection-change="selsChange" style="width:100%;">
			<el-table-column v-for="(item,index) in powerListData.form.power" :key="item"  v-if="secIsShow(item)" :type="item" :label="powerListData.checkName[item]" width="55"></el-table-column>
      <el-table-column v-for="(item,index) in powerListData.form.power" :key="item"  v-if="indexIsShow(item)" :type="item" :label="powerListData.checkName[item]" width="60"></el-table-column>

			<el-table-column v-for="(item,index) in powerListData.form.power" :key="item"  v-if="listIsShow(item)" :prop="item" :label="powerListData.checkName[item]" min-width="120" sortable>
      </el-table-column>

			<el-table-column width="100"
        v-for="(item,index) in powerListData.form.power"
        :key="item"
        v-if="btnIsShow(item,powerListData.form)"
        :label="powerListData.checkName[item]"
      >
				<template slot-scope="scope">
					<el-button type="text" size="small"
            v-for="(itemI,indexI) in powerListData.form.power"
            :key="itemI"
            v-if="btnItemIsShow(item,itemI)"
            @click="handleClick(scope.$index,scope.row,itemI)"
          >
            {{powerListData.checkName[itemI]}}
          </el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--分页工具条-->
    <el-col :span="24" class="toolbar">
      <Pagination :pageSize="$store.state.pageSize" :total="total" :currentPage="page" v-on:pagego="pageblur"></Pagination>
    </el-col>

		<!--弹窗-->
    <FormDialog :data="formDialogData" :listLoading="listLoading" v-on:resetState="changeState" v-on:formSub="_formSub"></FormDialog>
	</section>
</template>

<script>
	import {isLoginOver,Message,filterArr} from '../../common/js/util';
  import DefinedState from '../../common/js/status';
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

        formDialogData:{
          title:"",
          width:"40%",
          labelWidth:"100px",
          event:"",
          id:"",
          form:{},
          rules:{},
          label:{},
          formType:{},
          fromTypeList:{},
          isDisabledList:{}
        },

        powerListData:{
          tit:"权限设置",
          form:{power:["selection","index","name","addr","_itemDelete"]},
          checkVal:["selection","index","name","sex","age","birth","addr","itemEdit_itemDelete","_itemEdit","_itemDelete"],
          checkName:{
            selection:"选择",
            index:"序号",
            name:"姓名",
            sex:"性别",
            age:"年龄",
            birth:"生日",
            addr:"地址",
            itemEdit_itemDelete:"操作",
            _itemEdit:"编辑",
            _itemDelete:"删除"
          }
        }
			}
		},
		methods: {
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name,
          pageSize: this.$store.state.pageSize
				};
				this.listLoading = true;
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
				});
			},
      secIsShow(val){
        return val === "selection";
      },
      indexIsShow(val){
        return val === "index";
      },
      listIsShow(val){
        return val != "selection" && val != "index" && val.indexOf("_") == -1;
      },
      btnIsShow(val,obj){
        if(val.indexOf("_") > 0){
          const valArr = filterArr(obj,val);
          if(valArr.length > 0){
            return true;
          }else{
            this.powerListData.form.power = this.powerListData.form.power.filter(u => u !== val);
            return false;
          }
        }else{
          return false;
        }
      },
      btnItemIsShow(val1,val2){
        if(val2.indexOf("_") == 0){
          const _val = val2.split("_").join("");
          return val1.indexOf(_val) > -1 ? true : false;
        }else{
          return false;
        }
      },
      _addCheckVal(parentVal){
        console.log("ssss")
        this.powerListData.form.power.push(parentVal);
      },
      _removeParent(parentVal){
        console.log("pppp")
        this.powerListData.form.power = this.powerListData.form.power.filter(u => u !== parentVal);
      },
      //性别显示转换
      formatSex: function (row, column) {
        return DefinedState.sex[row.sex];
      },
      //弹窗取消或关闭
      changeState:function(){
        this.formDialogData.isVisible = false;
      },
      handleClick(index,row,type){
        if(type === "_itemEdit"){
          this.handleEdit(index,row);
        }else if(type === "_itemDelete"){
          this.handleDel(index,row);
        }
      },
			//删除
			handleDel: function (index, row) {
        const that = this;
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						Message(that,false,"删除成功",1);
						this.getUsers();
					});
				}).catch(() => {});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
        let data = Object.assign({}, row);
        const {name,sex,age,birth,addr} = data;
        this.formDialogData = {
          title:"编辑",
          width:"530px",
          labelWidth:"70px",
          event:"add",
          isVisible:true,
          id:row.id,
          form:{name,sex,age,birth,addr},
          rules:{
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            addr: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            age: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            birth: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ]
          },
          label:DefinedState.dld,
          formType:{
            name:"p",
            sex:"radio",
            age:"inputNumber",
            birth:"date",
            addr:"textarea"
          },
          fromTypeList:{
            age:{min:0,max:200},
            sex: [
              {label:0,dld:DefinedState.sex[0]},
              {label:1,dld:DefinedState.sex[1]}
            ]
          },
          isDisabledList:{
            name:false,
            sex:false,
            age:false,
            birth:false,
            addr:false
          }
        }
			},
			//编辑
			editSubmit: function () {
        const that = this;
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.listLoading = true;
          const para = {...Object.assign({}, this.formDialogData.form),...{id:this.formDialogData.id}};
          editUser(para).then((res) => {
            this.listLoading = false;
            this.formDialogData.isVisible = false;
            Message(that,false,"提交成功",1);
            this.getUsers();
          });
        });
			},
      // formDialog提交
      _formSub(type){
        if(type === "edit"){
          this.editSubmit();
        }
      },
			selsChange: function (sels) {
				this.sels = sels;
			},
      //换页
      pageblur(val) {
        this.page = val;
        this.getUsers();
      }
		},
		mounted() {
			this.getUsers();
		}
	}

</script>
<style lang="scss">
.el-table__header{
  th{
    .cell{
      text-align:center;
    }
  }
}
.el-table__body{
  td{
    .cell{
      text-align:center;
      div{
        text-align:center;
      }
    }
  }
}
</style>
