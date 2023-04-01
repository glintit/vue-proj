import Layout from '@/layout'

const demoRouter = {
  path: '/demo',
  component: Layout,
  name: 'demo',
  hidden: true,
  children: [
    {
        path: 'index',
        component: () => import('@/views/demo/index'),
        name: 'demo home'
    },
    {
      path: 'select',
      component: () => import('@/views/demo/select/index'),
      name: '选择框',
      meta:{title:'选择框'}
    },
    {
      path: 'list',
      component: () => import('@/views/demo/lst/index'),
      name: 'demo list',
      meta:{title:'列表'}
    },
    {
      path: 'table',
      component: () => import('@/views/demo/table/index'),
      name: '表格',
      meta:{title:'表格'}
    },
    {
      path: 'echarts',
      component: () => import('@/views/demo/echarts/index'),
      name: 'demo echarts',
      meta:{title:'echarts'}
    },
    {
      path: 'dialog',
      component: () => import('@/views/demo/dialog/index'),
      name: '对话框',
      meta:{title:'对话框'}
    },
    {
      path: 'tree',
      component: () => import('@/views/demo/tree/index'),
      name: 'demo tree',
      meta:{title:'树'}
    },
    {
      path: 'progress',
      component: () => import('@/views/demo/progress/index'),
      name: '进度条',
      meta:{title:'进度条'}
    },
    {
      path: 'image',
      component: () => import('@/views/demo/image/index'),
      name: '图片预览',
      meta:{title:'图片预览'}
    },
    {
      path: 'graph',
      component: () => import('@/views/demo/echarts/graph'),
      name: '关系图',
      meta:{title:'关系图'}
    },
    {
      path: 'button',
      component: () => import('@/views/demo/button/index'),
      name: '按钮',
      meta:{title:'按钮'}
    },
  ]
}
export default demoRouter
