<template>
  <div>
    <Todo msg="o2"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Todo from '@/components/Todo.vue'

export default defineComponent({
  name: 'Options1',
  components: { Todo }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
