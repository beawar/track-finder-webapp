import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';

export const routes = [
	{
		path: '/',
		key: 'home',
		component: HomePage,
	},
	{
		path: '*',
		key: 'errorPage',
		component: ErrorPage,
	},
];
