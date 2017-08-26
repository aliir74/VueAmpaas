// CommitChart.js
import { Bar, mixins } from 'vue-chartjs'

export default Bar.extend({
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options', 'update'],
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
      console.log(1)
      this.renderChart(this.chartData, this.options)
    }
  }
})
