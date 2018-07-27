<template>
  <div class="count-to-wrap">
    <el-row :gutter="20" v-for="(item,index) in cardList" :key="index" class="cardlist-wrap">
      <el-col :span="colSpan(item.widthLength)" v-for="(itemI, indexI) in item.cardDataList" :key="setKey(itemI.name,itemI.value)">
        <el-card :body-style="{padding:'0px'}">
          <div class="card-font" style="padding:14px;">
            <count-to class="card-panel-num" :startVal="itemI.startVal" :endVal="itemI.value" :duration="itemI.duration"></count-to>
            <div class="bottom clearfix">
              <time class="card-tit">{{itemI.name}}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import CountTo from 'vue-count-to'

  export default {
    data(){
      return {
        cardList:[
          {
            widthLength:4,
            cardDataList:[
              {name:"num one",startVal:0,value:19990,duration:3000},
              {name:"num two",startVal:0,value:13600,duration:3300},
              {name:"num three",startVal:0,value:49995,duration:3600},
              {name:"num four",startVal:0,value:102400,duration:3900},
            ]
          },
          {
            widthLength:4,
            cardDataList:[
              {name:"num five",startVal:0,value:425670,duration:3000},
              {name:"num six",startVal:0,value:78290,duration:3300},
              {name:"num seven",startVal:0,value:189357,duration:3600}
            ]
          }
        ]
      }
    },
    methods: {
      setKey(val1,val2){
        return `${val1}${val2}`;
      },
      colSpan(len){
        return parseInt(24/len);
      }
    },
    components: {
      CountTo
    }
  }
</script>
<style lang="scss" scoped>
@import '~scss_vars';

.cardlist-wrap{
  margin:10px 0;
  .card-font{
    text-align:center;
    .card-panel-num{
      font-size:24px;
    }
    .card-tit{
      font-size: 13px;
      color:$color-dark-gray;
    }
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .clearfix:before,.clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
}
</style>
