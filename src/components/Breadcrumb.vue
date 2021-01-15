<template>
  <a-breadcrumb style="margin: 16px 0">

    <a-breadcrumb-item v-for="bread in breadList"  :key="bread.path">{{bread.meta.title}}</a-breadcrumb-item>

  </a-breadcrumb>
</template>
<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import { RouteLocationMatched, useRoute } from 'vue-router'

// interface CustomRouteLocationMatched
export default defineComponent({

  setup () {
    const breadList = ref<RouteLocationMatched[]>([])

    // const isHome = (route: RouteLocationMatched) => route.name === 'Desc'
    const route = useRoute()
    const getBreadcrumb = () => {
      const matched = route.matched
      // 如果不是首页
      //   if (!isHome(matched[0])) {
      //     matched = [{ path: '/desc', meta: { title: '说明' } }].concat(matched)
      //   }
      breadList.value = matched
    }

    watch(route, getBreadcrumb)
    getBreadcrumb()

    return {
      breadList
    }
  }
})
</script>
