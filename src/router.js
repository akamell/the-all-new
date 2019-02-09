import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  name: 'router',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('./views/listTask.vue'),
    },
  ],
});
