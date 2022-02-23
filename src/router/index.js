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
  //登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  //注册
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },

  //404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  //基地信息
  {
    path: '/base',
    component: Layout,
    redirect: '/base',
    children: [{
      path: 'base',
      name: 'base',
      component: () => import('@/views/base/index'),
    }],
    hidden: true
  },

  //宣传信息详情页面
  {
    path: '/propagate',
    component: Layout,
    children: [
      {
        path: 'propagate',
        name: 'propagate',
        component: () => import('@/views/propaganda/info')
      }
    ],
    hidden: true
  },

  //步骤页面（接受、发布）
  {
    path: '/step',
    component: Layout,
    redirect: '/step',
    children: [{
      path: 'publish',
      name: 'publish',
      component: () => import('@/views/step/publish'),
    },
      {
        path: 'accept',
        name: 'accept',
        component: () => import('@/views/step/accept'),
      }],
    hidden: true
  },

  //个人信息（’我的主页‘）
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    children: [{
      path: 'user',
      name: 'user',
      component: () => import('@/views/user/index'),
    },
      {
        path: 'edit',
        name: 'edit',
        component: () => import('@/views/user/edit'),
      }],
    hidden: true
  },

  //基地、个人认证页面
  {
    path: '/auth',
    component: Layout,
    redirect: '/auth',
    children: [{
      path: 'auth',
      name: 'auth',
      component: () => import('@/views/auth/index'),
    }],
    hidden: true
  },

  //协议（认证协议、用户协议、政策法规）
  {
    path: '/file',
    component: Layout,
    children: [{
      path: 'auth',
      name: 'auth',
      component: () => import('@/views/file/index'),
    },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/file/user'),
      },
      {
        path: 'policy',
        name: 'policy',
        component: () => import('@/views/file/policy'),
      }],
    hidden: true
  },

  //已领养页面
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

  //待领养页面
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

  //已救助页面
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

  //待救助页面
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

  //资源捐赠页面
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

  //资源需求页面
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

  //首页
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

  //救助信息页面
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

  //领养信息页面
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

  //资源对接页面
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

  //宣传信息页面
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
