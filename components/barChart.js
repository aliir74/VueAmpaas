// CommitChart.js
import { Bar } from 'vue-chartjs'

export default Bar.extend({
  props: ['chartData', 'update', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options)
    /*    this.renderChart({

      datasets: [
        {
          label: 'شاخص ها',
          backgroundColor: '#f87979',
          data: this.chartData
        }
      ]
    }) */
  },
  watch: {
    update: function () {
      this.renderChart(this.chartData, this.options)
    }
  }
})
