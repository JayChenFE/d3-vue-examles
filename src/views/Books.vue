<template>
  <div>
    <Todo msg="books"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Todo from '@/components/Todo.vue'

export default defineComponent({
  name: 'Books',
  components: { Todo }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
