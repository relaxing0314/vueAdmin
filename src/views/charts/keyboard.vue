<template>
  <div class='chart-container'>
    <chart height='100%' width='100%' :data="keyboardData"></chart>
  </div>
</template>

<script>
import {xAxisData,sin} from '@/common/js/util'
import Chart from '@/components/Charts/keyboard'

export default {
  name: 'keyboardChart',
  data(){
    return {
      xAxisData:[],
      data:[],
      data2:[],
      keyboardData:{
        className: 'chart',
        id: 'chart',
        width: '100%',
        height: '100%',
        option:{
          backgroundColor: '#08263a',
          xAxis: [{
            show: false,
            data: xAxisData(50)
          }, {
            show: false,
            data: xAxisData(50)
          }],
          visualMap: {
            show: false,
            min: 0,
            max: 50,
            dimension: 0,
            inRange: {
              color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#4a657a'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#08263f'
              }
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: 'back',
            type: 'bar',
            data: sin(50,3),
            z: 1,
            itemStyle: {
              normal: {
                opacity: 0.4,
                barBorderRadius: 5,
                shadowBlur: 3,
                shadowColor: '#111'
              }
            }
          }, {
            name: 'Simulate Shadow',
            type: 'line',
            data:sin(50,5),
            z: 2,
            showSymbol: false,
            animationDelay: 0,
            animationEasing: 'linear',
            animationDuration: 1200,
            lineStyle: {
              normal: {
                color: 'transparent'
              }
            },
            areaStyle: {
              normal: {
                color: '#08263a',
                shadowBlur: 50,
                shadowColor: '#000'
              }
            }
          }, {
            name: 'front',
            type: 'bar',
            data:sin(50,5),
            xAxisIndex: 1,
            z: 3,
            itemStyle: {
              normal: {
                barBorderRadius: 5
              }
            }
          }],
          animationEasing: 'elasticOut',
          animationEasingUpdate: 'elasticOut',
          animationDelay(idx) {
            return idx * 20
          },
          animationDelayUpdate(idx) {
            return idx * 20
          }
        }
      }
    }
  },
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  padding: 20px;
  width: 100%;
  height: 85vh;
}
</style>

