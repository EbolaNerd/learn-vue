import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import JobResultsPage from '@/pages/JobResultsPage.vue';
import JobPage from '@/pages/JobPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/jobs/results',
    name: 'JobResults',
    component: JobResultsPage,
  },
  {
    path: '/jobs/results/:id',
    name: 'JobPage',
    component: JobPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
