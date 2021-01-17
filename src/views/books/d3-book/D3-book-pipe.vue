<template>
  <div id='svg-contrainer'>

  </div>
</template>

<script>
import { onMounted, defineComponent } from 'vue'
import * as d3 from 'd3'

export default defineComponent({
  name: 'D3-book-pipe',
  setup () {
    onMounted(() => {
      const w = 300
      const h = 300

      const dataset = [5, 10, 20, 45, 6, 25]

      const outerRadius = w / 2
      const innerRadius = 0
      const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)

      const pie = d3.pie()

      // Easy colors accessible via a 10-step ordinal scale
      const color = d3.scaleOrdinal(d3.schemeCategory10)

      // Create SVG element
      const svg = d3.select('#svg-contrainer')
        .append('svg')
        .attr('width', w)
        .attr('height', h)

      // Set up groups
      const arcs = svg.selectAll('g.arc')
        .data(pie(dataset))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .attr('transform', `translate(${outerRadius},${outerRadius})`)

      // Draw arc paths
      arcs.append('path')
        .attr('fill', function (d, i) {
          return color(i)
        })
        .attr('d', arc)

      // Labels
      arcs.append('text')
        .attr('transform', function (d) {
          return `translate(${arc.centroid(d)})`
        })
        .attr('text-anchor', 'middle')
        .text(function (d) {
          return d.value
        })
    })
  }

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
