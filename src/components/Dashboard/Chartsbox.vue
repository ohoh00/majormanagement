<template>
   <div id="chart" class="card">
        <apexchart type="bar" height="1350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
export default {
    data () {
        return {
             series: [{
            name: 'GradePoint ต่ำสุด',
            data: [44, 55, 41, 64, 22, 43, 21, 26, 36, 20, 90,44, 55, 41, 64, 22, 43, 21, 26, 36]
          }, {
            name: 'GradePoint สูงสุด',
            data: [53, 32, 33, 52, 13, 44, 32, 25, 36, 87, 15,44, 55, 41, 64, 22, 43, 21, 26, 36]
          },
          {
            name: 'GradePoint เฉลี่ย',
            data: [53, 32, 33, 52, 13, 44, 32, 25, 36, 87, 15,44, 55, 41, 64, 22, 43, 21, 26, 36]
          }
          ],
          chartOptions: {
            chart: {
              type: 'bar',
              height: 1000
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              }
            },
            dataLabels: {
              enabled: true,
              offsetX: -6,
              style: {
                fontSize: '12px',
                colors: ['#fff']
              }
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff']
            },
            xaxis: {
              categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'Germany','South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                'United States', 'China', 'Germany'
              ],
            },
          },
      }
    }
}
</script>