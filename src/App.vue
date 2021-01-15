<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="menuKeys" :style="{ lineHeight: '64px' }">

        <a-menu-item key="desc">
        <router-link to="/desc"></router-link>
          说明
        </a-menu-item>
        <a-menu-item key="demo">
         <router-link to="/demo"></router-link>
          Demo
        </a-menu-item>
        <a-menu-item key="bioInfo">
          <router-link to="/bioInfo"></router-link>
          生信可视化
        </a-menu-item>
        <a-menu-item key="books">
           <router-link to="/books"></router-link>
          书籍示例
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <router-view></router-view>
  </a-layout>
</template>
<script>

export default {
  components: {
    // UserOutlined,
    // LaptopOutlined,
    // NotificationOutlined
  },
  data () {
    return {
      menuKeys: ['desc']
    //   selectedKeys2: ['1'],
      //   collapsed: false,
    //   openKeys: ['sub1']
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}

#components-layout-demo-top-side-2 {
  /* height:100% */
  height: inherit;

  .logo {
    width: 120px;
    height: 31px;
    /* background: rgba(255, 255, 255, 0.2); */
    margin: 16px 28px 16px 0;
    float: left;
  }
}
</style>
