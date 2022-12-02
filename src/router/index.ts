import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteComponent, RouteRecordRaw } from 'vue-router';
import authRouter from '@/router/auth';
import isAuthGuard from '@/router/auth/authGuard';

const routes: Array<RouteRecordRaw> = [
  {
		path: '',
		beforeEnter: [ isAuthGuard ],
		name: 'todo',
		component: (): Promise<RouteComponent> => import('@/views/todo/ToDoPage.vue')
	},
  {
		path: '/auth',
		...authRouter
	},

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
