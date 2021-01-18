<template>
  <div id='svg-contrainer'>

  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'

export default defineComponent({
  name: 'Bio-boxplot-horizontal',
  setup () {
    onMounted(() => {
      const margin = { top: 10, right: 30, bottom: 30, left: 80 }
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
      d3.csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv')
        .then(data => {
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

          // Show the Y scale
          const y = d3
            .scaleBand()
            .range([height, 0])
            .domain(['setosa', 'versicolor', 'virginica'])
            .padding(0.4)
          svg
            .append('g')
            .call(d3.axisLeft(y).tickSize(0))
            .select('.domain')
            .remove()

          // Show the X scale
          const x = d3
            .scaleLinear()
            .domain([4, 8])
            .range([0, width])
          svg
            .append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5))
            .select('.domain')
            .remove()

          // Color scale
          const myColor = d3
            .scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([4, 8])

          // Add X axis label:
          svg
            .append('text')
            .attr('text-anchor', 'end')
            .attr('x', width)
            .attr('y', height + margin.top + 30)
            .text('Sepal Length')

          // Show the main vertical line
          svg
            .selectAll('vertLines')
            .data(sumstat)
            .enter()
            .append('line')
            .attr('x1', d => {
              return x(d.value.min)
            })
            .attr('x2', d => {
              return x(d.value.max)
            })
            .attr('y1', d => {
              return y(d.key) + y.bandwidth() / 2
            })
            .attr('y2', d => {
              return y(d.key) + y.bandwidth() / 2
            })
            .attr('stroke', 'black')
            .style('width', 40)

          // rectangle for the main box
          svg
            .selectAll('boxes')
            .data(sumstat)
            .enter()
            .append('rect')
            .attr('x', d => x(d.value.q1)) // console.log(x(d.value.q1)) ;
            .attr('width', d => x(d.value.q3) - x(d.value.q1)) // console.log(x(d.value.q3)-x(d.value.q1))
            .attr('y', d => y(d.key))
            .attr('height', y.bandwidth())
            .attr('stroke', 'black')
            .style('fill', '#69b3a2')
            .style('opacity', 0.3)

          // Show the median
          svg
            .selectAll('medianLines')
            .data(sumstat)
            .enter()
            .append('line')
            .attr('y1', d => y(d.key))
            .attr('y2', d => y(d.key) + y.bandwidth() / 2)
            .attr('x1', d => x(d.value.median))
            .attr('x2', d => x(d.value.median))
            .attr('stroke', 'black')
            .style('width', 80)

          // create a tooltip
          const tooltip = d3
            .select('#svg-contrainer')
            .append('div')
            .style('opacity', 0)
            .attr('class', 'tooltip')
            .style('font-size', '16px')
          // Three function that change the tooltip when user hover / move / leave a cell
          const mouseover = function (event, d) {
            tooltip.transition()
              .duration(200)
              .style('opacity', 1)

            tooltip.html(`<span style='color:grey'>Sepal length: </span>${d.Sepal_Length}`) // + d.Prior_disorder + "<br>" + "HR: " +  d.HR)
              .style('left', `${event.clientX + 30}px`)
              .style('top', `${event.clientY + 30}px`)
          }
          const mousemove = function (event) {
            tooltip.style('left', `${d3.pointer(event)[0] + 30}px`)
              .style('top', `${d3.pointer(event)[1] + 30}px`)
          }
          const mouseleave = () => {
            tooltip.transition()
              .duration(200)
              .style('opacity', 0)
          }

          // Add individual points with jitter
          const jitterWidth = 50
          svg.selectAll('indPoints')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => x(d.Sepal_Length))
            .attr('cy', d =>
              y(d.Species) + y.bandwidth() / 2 - jitterWidth / 2 + Math.random() * jitterWidth)
            .attr('r', 4)
            .style('fill', d => myColor(+d.Sepal_Length))
            .attr('stroke', 'black')
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave)
        })
    })
  }

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
#svg-contrainer {
  position: relative;

  .tooltip {
  position: absolute;
  background-color: black;
  border: none;
  border-radius: 5px;
  padding: 15px;
  min-width: 100px;
  text-align: left;
  color: white;
}
}

</style>
