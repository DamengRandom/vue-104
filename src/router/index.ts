import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JobsView from '@/views/JobsView.vue';
import NotFound from '@/views/NotFound.vue';
import JobView from '@/views/JobView.vue';
import AddJobView from '@/views/AddJobView.vue';
import EditJobView from '@/views/EditJobView.vue';
import ElementPlus from '@/components/ElementPlus.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobView
    },
    {
      path: '/jobs/add',
      name: 'jobs-add',
      component: AddJobView
    },
    {
      path: '/jobs/edit/:id',
      name: 'jobs-edit',
      component: EditJobView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/element-plus',
      name: 'element-plus',
      component: ElementPlus
    },
    {
      path: '/avoid-mistake',
      name: 'avoid-mistake',
      component: () => import('@/views/AvoidMistakeView.vue')
    },
    {
      path: '/vue-table-test',
      name: 'vue-table-test',
      component: () => import('@/views/VueTableDemo/PeopleTableDemo.vue')
    },
    {
      path: '/tanstack-vue-query',
      name: 'tanstack-vue-query',
      component: () => import('@/views/TanstackVueQuery/index.vue')
    },
  ],
});

export default router;
