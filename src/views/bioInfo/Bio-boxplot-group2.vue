<template>
  <div id='svg-contrainer'>

  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'

export default defineComponent({
  name: 'Bio-boxplot-group2',
  setup () {
    onMounted(() => {
      // set the dimensions and margins of the graph
      // set the dimensions and margins of the graph
      const margin = { top: 10, right: 30, bottom: 30, left: 40 }
      const width = 800 - margin.left - margin.right
      const height = 400 - margin.top - margin.bottom

      // append the svg object to the body of the page
      const svg = d3
        .select('#svg-contrainer')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const json = `[
{"Gene":"A","Group":"zygote","Expr":"0.8"},
{"Gene":"A","Group":"zygote","Expr":"1.3"},
{"Gene":"A","Group":"zygote","Expr":"1.4"},
{"Gene":"A","Group":"zygote","Expr":"0.9"},
{"Gene":"A","Group":"zygote","Expr":"1.9"},
{"Gene":"A","Group":"zygote","Expr":"1.2"},
{"Gene":"A","Group":"2cell","Expr":"8"},
{"Gene":"A","Group":"2cell","Expr":"13"},
{"Gene":"A","Group":"2cell","Expr":"14"},
{"Gene":"A","Group":"2cell","Expr":"9"},
{"Gene":"A","Group":"2cell","Expr":"19"},
{"Gene":"A","Group":"2cell","Expr":"12"},
{"Gene":"A","Group":"4cell","Expr":"3.2"},
{"Gene":"A","Group":"4cell","Expr":"5.2"},
{"Gene":"A","Group":"4cell","Expr":"5.6"},
{"Gene":"A","Group":"4cell","Expr":"3.6"},
{"Gene":"A","Group":"4cell","Expr":"7.6"},
{"Gene":"A","Group":"4cell","Expr":"4.8"},
{"Gene":"B","Group":"zygote","Expr":"0.8"},
{"Gene":"B","Group":"zygote","Expr":"1.3"},
{"Gene":"B","Group":"zygote","Expr":"1.4"},
{"Gene":"B","Group":"zygote","Expr":"1.9"},
{"Gene":"B","Group":"zygote","Expr":"1.2"},
{"Gene":"B","Group":"2cell","Expr":"8"},
{"Gene":"B","Group":"2cell","Expr":"13"},
{"Gene":"B","Group":"2cell","Expr":"14"},
{"Gene":"B","Group":"2cell","Expr":"9"},
{"Gene":"B","Group":"2cell","Expr":"19"},
{"Gene":"B","Group":"2cell","Expr":"12"},
{"Gene":"B","Group":"4cell","Expr":"3.2"},
{"Gene":"B","Group":"4cell","Expr":"5.2"},
{"Gene":"B","Group":"4cell","Expr":"5.6"},
{"Gene":"B","Group":"4cell","Expr":"3.6"},
{"Gene":"B","Group":"4cell","Expr":"7.6"},
{"Gene":"B","Group":"4cell","Expr":"4.8"},
{"Gene":"C","Group":"zygote","Expr":"0.8"},
{"Gene":"C","Group":"zygote","Expr":"1.3"},
{"Gene":"C","Group":"zygote","Expr":"1.4"},
{"Gene":"C","Group":"zygote","Expr":"1.9"},
{"Gene":"C","Group":"zygote","Expr":"1.2"},
{"Gene":"C","Group":"2cell","Expr":"8"},
{"Gene":"C","Group":"2cell","Expr":"13"},
{"Gene":"C","Group":"2cell","Expr":"14"},
{"Gene":"C","Group":"2cell","Expr":"9"},
{"Gene":"C","Group":"2cell","Expr":"19"},
{"Gene":"C","Group":"2cell","Expr":"12"},
{"Gene":"C","Group":"4cell","Expr":"3.2"},
{"Gene":"C","Group":"4cell","Expr":"5.2"},
{"Gene":"C","Group":"4cell","Expr":"5.6"},
{"Gene":"C","Group":"4cell","Expr":"3.6"},
{"Gene":"C","Group":"4cell","Expr":"7.6"},
{"Gene":"C","Group":"4cell","Expr":"4.8"},
{"Gene":"D","Group":"zygote","Expr":"0.8"},
{"Gene":"D","Group":"zygote","Expr":"1.3"},
{"Gene":"D","Group":"zygote","Expr":"1.4"},
{"Gene":"D","Group":"zygote","Expr":"1.9"},
{"Gene":"D","Group":"zygote","Expr":"1.2"},
{"Gene":"D","Group":"2cell","Expr":"8"},
{"Gene":"D","Group":"2cell","Expr":"13"},
{"Gene":"D","Group":"2cell","Expr":"14"},
{"Gene":"D","Group":"2cell","Expr":"9"},
{"Gene":"D","Group":"2cell","Expr":"19"},
{"Gene":"D","Group":"2cell","Expr":"12"},
{"Gene":"D","Group":"4cell","Expr":"3.2"},
{"Gene":"D","Group":"4cell","Expr":"5.2"},
{"Gene":"D","Group":"4cell","Expr":"5.6"},
{"Gene":"D","Group":"4cell","Expr":"3.6"},
{"Gene":"D","Group":"4cell","Expr":"7.6"},
{"Gene":"D","Group":"4cell","Expr":"4.8"}
]`
      const data1 = JSON.parse(json)

      // Read the data and compute summary statistics for each specie

      // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
      const sumstat = d3
        .rollups(data1, d => {
          const quanti = p => d3.quantile(d.map(g => g.Expr).sort(d3.ascending), p)
          const q1 = quanti(0.25)
          const median = quanti(0.5)
          const q3 = quanti(0.75)
          const interQuantileRange = q3 - q1
          const min = q1 - 0.2 * interQuantileRange
          const max = q3 + 1 * interQuantileRange
          return { q1, median, q3, interQuantileRange, min, max }
        }, d => { return d.Gene + d.Group })
        .map(item => ({ key: item[0], value: item[1] }))

      //   Show the X scale
      const boxWidth = 20
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(['A', 'B', 'C', 'D'])
        .paddingInner(1)
        .paddingOuter(0.5)
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))

      // Show the Y scale
      const y = d3
        .scaleLinear()
        .domain([0, 15])
        .range([height, 0])
      svg.append('g').call(d3.axisLeft(y))

      const offsetX = {
        '2cell': -(boxWidth * 1.5 + 2),
        '4cell': 0,
        zygote: (boxWidth * 1.5 + 2)
      }

      // Show the main vertical line
      svg
        .selectAll('vertLines')
        .data(sumstat)
        .enter()
        .append('line')
        .attr('x1', d => x(d.key.substring(0, 1)) + offsetX[d.key.substring(1)])
        .attr('x2', d => x(d.key.substring(0, 1)) + offsetX[d.key.substring(1)])
        .attr('y1', d => y(d.value.min))
        .attr('y2', d => y(d.value.max))
        .attr('stroke', 'black')
        .style('width', 40)

      // rectangle for the main box
      const colorMap = {
        '2cell': '#80deea',
        '4cell': '#8cd842',
        zygote: '#ffb7da'
      }

      svg
        .selectAll('boxes')
        .data(sumstat)
        .enter()
        .append('rect')
        .attr('x', d => x(d.key.substring(0, 1)) + offsetX[d.key.substring(1)] - boxWidth / 2)
        .attr('y', d => y(d.value.q3))
        .attr('height', d => y(d.value.q1) - y(d.value.q3)
        )
        .attr('width', boxWidth)
        .attr('stroke', 'black')
        .style('fill', d => {
          return colorMap[d.key.substring(1)]
        })

      // Show the median
      svg
        .selectAll('medianLines')
        .data(sumstat)
        .enter()
        .append('line')
        .attr('x1', d => x(d.key.substring(0, 1)) + offsetX[d.key.substring(1)] - boxWidth / 2)
        .attr('x2', d => x(d.key.substring(0, 1)) + offsetX[d.key.substring(1)] + boxWidth / 2)
        .attr('y1', d => y(d.value.median))
        .attr('y2', d => y(d.value.median))
        .attr('stroke', 'black')
        .style('width', 80)
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
