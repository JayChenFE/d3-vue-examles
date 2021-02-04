<template>
  <div id='svg-contrainer'>

  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import * as d3 from 'd3'
import { VennDiagram } from '@/utils/vennUtil.js'

export default defineComponent({
  name: 'Bio-venn',
  setup () {
    onMounted(() => {
      const sets = [
        { sets: ['Information'], size: 12 },
        { sets: ['Things That Overlap'], size: 12 },
        { sets: ['Circles'], size: 12 },
        { sets: ['Information', 'Things That Overlap'], size: 4, label: 'Redundancy' },
        { sets: ['Information', 'Circles'], size: 4, label: 'Pie Charts' },
        { sets: ['Things That Overlap', 'Circles'], size: 4, label: 'Eclipses' },
        { sets: ['Information', 'Things That Overlap', 'Circles'], size: 2, label: 'Venn Diagrams' }
      ]

      const chart = VennDiagram()
      chart.wrap(false)
        .width(640)
        .height(640)

      const div = d3.select('#svg-contrainer').datum(sets).call(chart)
      div.selectAll('text').style('fill', 'white')
      div.selectAll('.venn-circle path').style('fill-opacity', 0.6)
    })
  }

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
