import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/index'),
    }],
    hidden: true
  },

  {
    path: '/adopted',
    component: Layout,
    redirect: '/adopted',
    children: [{
      path: 'adopted',
      name: 'adopted',
      component: () => import('@/views/adopt/adopted'),
    }],
    hidden: true
  },

  {
    path: '/toAdopted',
    component: Layout,
    redirect: '/toAdopted',
    children: [{
      path: 'toAdopted',
      name: 'toAdopted',
      component: () => import('@/views/adopt/toAdopted'),
    }],
    hidden: true
  },

  {
    path: '/rescued',
    component: Layout,
    redirect: '/rescued',
    children: [{
      path: 'rescued',
      name: 'rescued',
      component: () => import('@/views/rescue/rescued'),
    }],
    hidden: true
  },

  {
    path: '/toRescued',
    component: Layout,
    redirect: '/toRescued',
    children: [{
      path: 'toRescued',
      name: 'toRescued',
      component: () => import('@/views/rescue/toRescued'),
    }],
    hidden: true
  },

  {
    path: '/donate',
    component: Layout,
    redirect: '/donate',
    children: [{
      path: 'donate',
      name: 'donate',
      component: () => import('@/views/resource/donate'),
    }],
    hidden: true
  },

  {
    path: '/demand',
    component: Layout,
    redirect: '/demand',
    children: [{
      path: 'demand',
      name: 'demand',
      component: () => import('@/views/resource/demand'),
    }],
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },

  {
    path: '/rescue',
    component: Layout,
    redirect: '/rescue',
    children: [
      {
        path: 'rescue',
        name: 'Rescue',
        component: () => import('@/views/rescue/index'),
        meta: {title: '救助信息', icon: 'help1'}
      }]
  },

  {
    path: '/adopt',
    component: Layout,
    redirect: '/adopt',
    children: [
      {
        path: 'adopt',
        name: 'Adopt',
        component: () => import('@/views/adopt/index'),
        meta: {title: '领养信息', icon: 'help2'}
      }
    ]
  },

  {
    path: '/resource',
    component: Layout,
    redirect: '/resource',
    children: [
      {
        path: 'resource',
        name: 'Resource',
        component: () => import('@/views/resource/index'),
        meta: {title: '资源对接信息', icon: 'help3'}
      }
    ]
  },

  {
    path: '/propaganda',
    component: Layout,
    redirect: '/propaganda',
    children: [
      {
        path: 'propaganda',
        name: 'Propaganda',
        component: () => import('@/views/propaganda/index'),
        meta: {title: '宣传信息', icon: 'propaganda'}
      }
    ]
  },

  /*  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },*/

  // 04 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
