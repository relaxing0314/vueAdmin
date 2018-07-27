<template>
  <div class="dndList">
    <div class="dndList-list" :style="{width:list1.width}">
      <h3>{{list1.tit}}</h3>
      <draggable :list="list1.list" class="dragArea" :options="{group:'article'}">
        <div class="list-complete-item" v-for="element in list1.list" :key='element.id'>
          <div class="list-complete-item-handle">{{element.name}}  [{{element.addr}}]</div>
          <div style="position:absolute;right:0px;">
            <span style="float:right;margin-top:-15px;margin-right:5px;" @click="deleteEle(element)">
              <i style="color:#ff4949" class="el-icon-arrow-right"></i>
            </span>
          </div>
        </div>
      </draggable>
    </div>
    <div class="dndList-list" :style="{width:list2.width}">
      <h3>{{list2.tit}}</h3>
      <draggable :list="filterList2" class="dragArea" :options="{group:'article'}">
        <div class="list-complete-item" v-for="element in filterList2" :key='element.id'>
          <div style="position:absolute;left:0px;">
            <span style="float:right;margin:0 5px;" @click="pushEle(element)">
              <i style="color:#ff4949" class="el-icon-arrow-left"></i>
            </span>
          </div>
          <div class='list-complete-item-handle2' style="margin-left:20px;"> {{element.name}} [{{element.addr}}]</div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DndList',
  components: { draggable },
  computed: {
    filterList2() {
      return this.list2.list.filter(v => {
        if (this.isNotInList1(v)) {
          return v
        }
        return false
      })
    }
  },
  props: {
    list1: {
      type: Object,
      default() {
        return {
          tit:"",
          width:"48%",
          list:[]
        }
      }
    },
    list2: {
      type: Object,
      default() {
        return {
          tit:"",
          width:"48%",
          list:[]
        }
      }
    }
  },
  methods: {
    isNotInList1(v) {
      return this.list1.list.every(k => v.id !== k.id)
    },
    isNotInList2(v) {
      return this.list2.list.every(k => v.id !== k.id)
    },
    deleteEle(ele) {
      for (const item of this.list1.list) {
        if (item.id === ele.id) {
          const index = this.list1.list.indexOf(item)
          this.list1.list.splice(index, 1)
          break
        }
      }
      if (this.isNotInList2(ele)) {
        this.list2.list.unshift(ele)
      }
    },
    pushEle(ele) {
      this.list1.list.push(ele)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4AB7BD;
}

.list-complete-item.sortable-ghost {
  background: #30B08F;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
