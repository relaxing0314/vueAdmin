<template>
  <div :class="data.className" :id="data.id" :style="{height:data.height,width:data.width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    data: {
      type: Object,
      default: {
        className: 'chart',
        id: 'chart',
        width: '200px',
        height: '200px',
        option:{}
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const that = this;
      this.chart = echarts.init(document.getElementById(this.data.id))

      this.chart.setOption(that.data.option)
    }
  }
}
</script>
