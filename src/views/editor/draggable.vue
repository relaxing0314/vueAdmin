<template>
  <div class="draggable-wrap">
    <code class="draggable-code">draggable base on
      <a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
    </code>
    <div class="editor-container">
      <dnd-list :list1="listOne" :list2="listTwo"></dnd-list>
    </div>
  </div>
</template>

<script>
import DndList from '@/components/draggable/draggable.vue';
import { getUserListPage } from '../../api/api';

export default {
  name: 'dndList-demo',
  components: { DndList },
  data() {
    return {
      listOne:{
        tit:"List",
        width:"48%",
        list:[]
      },
      listTwo:{
        tit:"List pool",
        width:"48%",
        list:[]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let para = {
          page: 1,
          name:"",
          pageSize:12
        };
      this.listLoading = true;
      getUserListPage(para).then((res) => {
        this.listOne.list = res.data.users.splice(0, 5)
        this.listTwo.list = res.data.users
        this.listLoading = false;
      });
    }
  }
}
</script>
<style lang="scss">
@import '~scss_vars';
.draggable-wrap{
  .draggable-code{
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
</style>

