<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              箱线图(boxplot)
            </span>
          </template>
          <router-link to="/bioInfo/bio-boxplot-basic">
            <a-menu-item key="1">
              基本
            </a-menu-item>
          </router-link>
          <!-- <router-link to="/books/option2">
            <a-menu-item key="2">option2</a-menu-item>
          </router-link> -->
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
       <Breadcrumb></Breadcrumb>
      <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0,height:'280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default defineComponent({
  name: 'Books',
  components: { Breadcrumb }
})
</script>

<style scoped lang="scss">
</style>
