<template>
  <div>
    <Todo/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Todo from '@/components/Todo.vue'

export default defineComponent({
  name: 'BioInfo',
  components: { Todo }
})
</script>

<style lang="scss">

</style>
