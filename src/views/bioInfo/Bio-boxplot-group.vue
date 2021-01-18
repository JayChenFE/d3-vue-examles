<template>
  <div id='svg-contrainer'>

  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'

export default defineComponent({
  name: 'Bio-boxplot-group',
  setup () {
    onMounted(() => {
      // set the dimensions and margins of the graph
      // set the dimensions and margins of the graph
      const margin = { top: 10, right: 30, bottom: 30, left: 40 }
      const width = 460 - margin.left - margin.right
      const height = 400 - margin.top - margin.bottom

      // append the svg object to the body of the page
      const svg = d3
        .select('#svg-contrainer')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      // Read the data and compute summary statistics for each specie
      d3.csv(
        'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv'
      ).then(data => {
        // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
        const sumstat = d3
          .rollups(data, d => {
            const quanti = p => d3.quantile(d.map(g => g.Sepal_Length).sort(d3.ascending), p)
            const q1 = quanti(0.25)
            const median = quanti(0.5)
            const q3 = quanti(0.75)
            const interQuantileRange = q3 - q1
            const min = q1 - 1.5 * interQuantileRange
            const max = q3 + 1.5 * interQuantileRange
            return { q1, median, q3, interQuantileRange, min, max }
          }, d => d.Species)
          .map(item => ({ key: item[0], value: item[1] }))

        //   Show the X scale
        const x = d3
          .scaleBand()
          .range([0, width])
          .domain(['setosa', 'versicolor', 'virginica'])
          .paddingInner(1)
          .paddingOuter(0.5)
        svg
          .append('g')
          .attr('transform', `translate(0,${height})`)
          .call(d3.axisBottom(x))

        // Show the Y scale
        const y = d3
          .scaleLinear()
          .domain([3, 9])
          .range([height, 0])
        svg.append('g').call(d3.axisLeft(y))

        // Show the main vertical line
        svg
          .selectAll('vertLines')
          .data(sumstat)
          .enter()
          .append('line')
          .attr('x1', d => x(d.key))
          .attr('x2', d => x(d.key))
          .attr('y1', d => y(d.value.min))
          .attr('y2', d => y(d.value.max))
          .attr('stroke', 'black')
          .style('width', 40)

        // rectangle for the main box
        const boxWidth = 100
        svg
          .selectAll('boxes')
          .data(sumstat)
          .enter()
          .append('rect')
          .attr('x', d => x(d.key) - boxWidth / 2)
          .attr('y', d => y(d.value.q3))
          .attr('height', d => y(d.value.q1) - y(d.value.q3)
          )
          .attr('width', boxWidth)
          .attr('stroke', 'black')
          .style('fill', '#69b3a2')

        // Show the median
        svg
          .selectAll('medianLines')
          .data(sumstat)
          .enter()
          .append('line')
          .attr('x1', d => x(d.key) - boxWidth / 2)
          .attr('x2', d => x(d.key) + boxWidth / 2)
          .attr('y1', d => y(d.value.median))
          .attr('y2', d => y(d.value.median))
          .attr('stroke', 'black')
          .style('width', 80)
      })
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
