<template>
  <div :style="{width, height}"></div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/theme/macarons'
import resize from './mixins/resize'

export default {
  name: 'LineChart',
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '350px',
    },
    yTittle: {
      type: String,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },

  watch: {
    chartData () {
      this.setOption()
    }
  },

  mounted () {
    this.initChart()
  },

  // 在组件死亡前销毁图表对象
  beforeDestroy () {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }

  },

  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOption()
    },

    setOption () {
      const {expectedData=[], actualData=[]} = this.chartData
      this.chart.setOption({
        // 提示
        tooltip: {
          trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
          axisPointer: {
            type: 'cross', // 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
          }
        },

        grid: {
          left: 10,
          top: 10,
          right: 20,
          bottom: 10,
          containLabel: true, // 这常用于『防止标签溢出』的场景
        },

        // 图例
        legend: {
          data: ['预期', '实际']
        },
        // x轴
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", '周日'],
          boundaryGap: false, // 坐标轴两边留白策略
        },
        // y轴
        yAxis: {
          name: this.yTittle, // 标题
        },
        // 系列
        series: [{
          name: '预期',
          type: 'line', // 图表类型
          data: expectedData,
          itemStyle: { // 线条的样式
            color: '#ff0000',
          },
          areaStyle: { // 面积部分的样式
            color: '#aaaaaa'
          },
          smooth: true, // 是否平滑曲线显示。
        }, {
          name: '实际',
          type: 'line',
          data: actualData
        }]
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
