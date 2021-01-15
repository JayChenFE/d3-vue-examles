<template>
  <a-breadcrumb style="margin: 16px 0">

    <a-breadcrumb-item v-for="bread in breadList"  :key="bread.path">{{bread.meta.title}}</a-breadcrumb-item>

  </a-breadcrumb>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

// interface CustomRouteLocationMatched
export default defineComponent({

  setup () {
    const route = useRoute()
    const breadList = computed(() => route.matched)

    return {
      breadList
    }
  }
})
</script>
