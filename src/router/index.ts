import { createRouter, createWebHistory } from "vue-router";

// 布局页面
const layout = () => import('@/layout/layout.vue') // 作业管理

const baseRoute = [
  {
    path: '/',
    redirect: '/demo'
  },
  {
    path: "/createLayout",
    name: "createLayout",
    component: () => import(/* webpackChunkName: "editor" */ "@/views/createLayout/index.vue"),
  },
  {
    path: "/ceiling",
    name: "ceiling",
    component: () =>
      import(/* webpackChunkName: "ceiling" */ "@/views/ceiling/index2.vue"),
  },
  {
    path: "/newLayout",
    name: "newLayout",
    component: () => import(/* webpackChunkName: "newLayout" */ "@/views/newLayout/index.vue"),
  },
  {
    path: "/waterfall",
    name: "waterfall",
    component: () => import(/* webpackChunkName: "waterfall" */ "@/views/waterfall/index.vue"),
  },
]
export const routes = [
  {
    path: '/layout',
    component: layout,
    name: 'layout',
    children: [
      {
        path: "/demo",
        name: "demo",
        component: () =>
          import(/* webpackChunkName: "demo" */ "@/views/demo/index.vue"),
        meta: {
          index: 1,
        },
      },
      // {
      //   path: "/vxeTable",
      //   name: "vxeTable",
      //   component: () =>
      //     import(/* webpackChunkName: "demo" */ "@/views/vxeTable/index.vue"),
      //   meta: {
      //     index: 1,
      //   },
      // },
      {
        path: "/upload",
        name: "upload",
        component: () =>
          import(/* webpackChunkName: "editor" */ "@/views/dragUpload/index.vue"),
        meta: {
          index: 1,
        },
      },
      {
        path: "/dragResize",
        name: "dragResize",
        component: () =>
          import(/* webpackChunkName: "editor" */ "@/views/dragResizeBox2/index.vue"),
        meta: {
          index: 1,
        },
      },
      {
        path: "/echarts",
        name: "echarts",
        component: () =>
          import(/* webpackChunkName: "editor" */ "@/views/echarts/index.vue"),
        meta: {
          index: 1,
        },
      },
      {
        path: "/intersectionObserver",
        name: "intersectionObserver",
        component: () =>
          import(/* webpackChunkName: "editor" */ "@/views/IntersectionObserver/index.vue"),
        meta: {
          index: 1,
        },
      },
      {
        path: "/dragDrawer",
        name: "dragDrawer",
        component: () =>
          import(/* webpackChunkName: "editor" */ "@/views/dragDrawer/index.vue"),
        meta: {
          index: 1,
        },
      },
      {
        path: "/sortTable",
        name: "sortTable",
        component: () =>
          import(/* webpackChunkName: "editor" */ "@/views/sortTable/index.vue"),
        meta: {
          index: 1,
        },
      },
      {
        path: "/pdfpptx",
        name: "pdfpptx",
        component: () =>
          import(/* webpackChunkName: "pdfpptx" */ "@/views/pdfpptx/index.vue"),
        meta: {
          index: 1,
        },
      },
    ]
  }

]

const router = createRouter({
  history: createWebHistory("/nuwa/"), // hash模式:createWebHashHistory，history模式:createWebHistory
  routes: [...baseRoute, ...routes]
});

export default router;
