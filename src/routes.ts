import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { TrackPage } from './pages/TrackPage';

export const routes = [
	{
		path: '/',
		key: 'home',
		component: HomePage,
	},
	{
		path: '/track/:id',
		key: 'trackPage',
		component: TrackPage,
	},
	{
		path: '*',
		key: 'errorPage',
		component: ErrorPage,
	},
];
