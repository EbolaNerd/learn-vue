import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import JobResultsPage from '@/pages/JobResultsPage.vue';

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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
