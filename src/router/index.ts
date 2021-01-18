import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Desc from '../views/Desc.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/desc' },
  {
    path: '/desc',
    name: 'Desc',
    meta: { title: '说明' },
    component: Desc
  },
  {
    path: '/demo',
    name: 'Demo',
    meta: { title: 'Demo' },
    component: () => import('../views/Demo.vue'),
    children: [
      {
        path: 'option1',
        meta: { title: 'option1' },
        component: () => import('../views/demo/Option1.vue')
      },
      {
        path: 'option2',
        meta: { title: 'option2' },
        component: () => import('../views/demo/Option2.vue')
      },
      {
        path: 'option5',
        meta: { title: '选项5' },
        component: () => import('../views/demo/Option5.vue')
      },
      {
        path: 'option9',
        meta: { title: 'option9' },
        component: () => import('../views/demo/Option9.vue')
      },
      {
        path: 'option12',
        meta: { title: 'option12' },
        component: () => import('../views/demo/Option12.vue')
      }
    ]
  },
  {
    path: '/bioInfo',
    name: 'bioInfo',
    meta: { title: '生信可视化' },
    component: () =>
      import(/* webpackChunkName: "bioInfo" */ '../views/BioInfo.vue'),
    children: [
      {
        path: 'bio-boxplot-basic',
        meta: { title: '生信-箱线图(基础)' },
        component: () => import('../views/bioInfo/Bio-boxplot-basic.vue')
      },
      {
        path: 'bio-boxplot-group',
        meta: { title: '生信-箱线图(分组)' },
        component: () => import('../views/bioInfo/Bio-boxplot-group.vue')
      },
      {
        path: 'bio-boxplot-points',
        meta: { title: '生信-箱线图(数据点)' },
        component: () => import('../views/bioInfo/Bio-boxplot-points.vue')
      },
      {
        path: 'bio-boxplot-horizontal',
        meta: { title: '生信-箱线图(横向)' },
        component: () => import('../views/bioInfo/Bio-boxplot-horizontal.vue')
      }
    ]
  },
  {
    path: '/books',
    name: 'Books',
    meta: { title: '书籍示例' },
    component: () =>
      import(/* webpackChunkName: "books" */ '../views/Books.vue'),
    children: [
      {
        path: 'd3-book-pipe',
        meta: { title: '数据可视化实战-饼图' },
        component: () => import('../views/books/d3-book/D3-book-pipe.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
