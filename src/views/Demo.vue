<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }">
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />subnav 1
            </span>
          </template>
          <router-link to="/demo/option1">
            <a-menu-item key="1">
              option1
            </a-menu-item>
          </router-link>
          <router-link to="/demo/option2">
            <a-menu-item key="2">option2</a-menu-item>
          </router-link>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <laptop-outlined />subnav 2
            </span>
          </template>
          <router-link to="/demo/option5">
            <a-menu-item key="5">option5</a-menu-item>
          </router-link>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
            <span>
              <notification-outlined />subnav 3
            </span>
          </template>
          <router-link to="/demo/option9">
            <a-menu-item key="9">option9</a-menu-item>
          </router-link>
          <router-link to="/demo/option12">
            <a-menu-item key="12">option12</a-menu-item>
          </router-link>
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
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import Breadcrumb from '@/components/Breadcrumb.vue'

export default defineComponent({
  name: 'Demo',
  components: { UserOutlined, LaptopOutlined, NotificationOutlined, Breadcrumb }
})
</script>

<style scoped lang="scss">
</style>
