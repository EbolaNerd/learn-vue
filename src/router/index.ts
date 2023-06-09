import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import JobResultsPage from '@/pages/JobResultsPage.vue';
import JobPage from '@/pages/JobPage.vue';
import TeamsPage from '@/pages/TeamsPage.vue';

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
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
      behavior: 'smooth',
    };
  },
});

export default router;
