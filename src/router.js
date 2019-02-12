import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  name: 'router',
  mode: 'history',
  routes: [
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/listTask.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('./views/createTask.vue'),
    },
    {
      path: '/author',
      name: 'author',
      component: () => import('./views/createAuthor.vue'),
    },
  ],
});
