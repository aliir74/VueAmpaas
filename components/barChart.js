// CommitChart.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ['chartData', 'update', 'options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    update: function () {
      this.renderChart(this.chartData, this.options)
    }
  }
})
