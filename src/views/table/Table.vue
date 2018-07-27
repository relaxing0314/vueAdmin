<template>
	<section>
		<!--工具条-->
    <TableBtn :btnlists="btnlists" v-on:tableClick="tableBtn"></TableBtn>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" border @selection-change="selsChange" style="width:100%;">
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column type="index" label="序号" width="60"></el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
			<el-table-column prop="age" label="年龄" width="100" sortable></el-table-column>
			<el-table-column prop="birth" label="生日" width="120" sortable></el-table-column>
			<el-table-column prop="addr" label="地址" min-width="180" sortable></el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
	import {isLoginOver,Message} from '../../common/js/util';
  import DefinedState from '../../common/js/status';
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
        btnlists:[
          {event:"toFilter",name:"姓名",value:"",isDisabled:false,type:"input",btn:"查询",startDis:false},
          {event:"toAdd",name:"新增",value:"",isDisabled:false,type:"button",btn:"",startDis:false},
          {event:"toDeleteMore",name:"批量删除",value:"",isDisabled:true,type:"button",btn:"",startDis:true},
          {event:"toExport",name:"导出",value:"",isDisabled:false,type:"button",btn:"",startDis:false},
        ],//table列表上方btn

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
      //性别显示转换
      formatSex: function (row, column) {
        return DefinedState.sex[row.sex];
      },
      //弹窗取消或关闭
      changeState:function(){
        this.formDialogData.isVisible = false;
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
			//显示新增界面
			handleAdd: function () {
        this.formDialogData = {
          title:"新增",
          width:"530px",
          labelWidth:"70px",
          event:"add",
          isVisible:true,
          id:"",
          form:{name:"",sex:0,age:null,birth:"",addr:""},
          rules:{
            name: [
              { required: true, message: '请输入姓名', trigger: 'blur' }
            ]
          },
          label:DefinedState.dld,
          formType:{
            name:"input",
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
			//新增
			addSubmit: function () {
        const that = this;
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.listLoading = true;
          const para = Object.assign({},this.formDialogData.form);
          addUser(para).then((res) => {
            this.listLoading = false;
            this.formDialogData.isVisible = false;
            Message(that,false,"新增成功",1);
            this.getUsers();
          });
        });
			},
      // formDialog提交
      _formSub(type){
        if(type === "edit"){
          this.editSubmit();
        }else if(type === "add"){
          this.addSubmit();
        }
      },
			selsChange: function (sels) {
				this.sels = sels;
        this.btnlists.map(v => {
          if(sels.length > 0){
            v.isDisabled = false;
          }else{
            if(v.startDis){
              v.isDisabled = !v.isDisabled;
            }
          }
        })
			},
			//批量删除
			batchRemove: function () {
        const that = this;
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						Message(that,false,"删除成功",1);
						this.getUsers();
					});
				}).catch(() => {});
			},
      //导出
      toExport(){
        this.listLoading = true;
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['编号', '姓名', '性别', '年龄（岁）','生日', '地址']
          const filterVal = ['id', 'name', 'sex', 'age', 'birth','addr']
          const list = this.users;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "用户",
            autoWidth: true
          })
          this.listLoading = false;
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      //table列表上方操作按钮
      tableBtn(data){
        if(data.event === "toFilter"){
          this.filters.name = data.value;
          this.getUsers();
        }else if(data.event === "toAdd"){
          this.handleAdd();
        }else if(data.event === "toDeleteMore"){
          this.batchRemove();
        }else if(data.event === "toExport"){
          this.toExport();
        }else{
          return false;
        }
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
