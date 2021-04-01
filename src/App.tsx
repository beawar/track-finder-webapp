import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import map from 'lodash/map';
import { route } from './routes';
import { FallbackPage } from './pages/FallbackPage';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import EditTrackPage from './pages/EditTrackPage';

const routeComponents = [
	{ path: route.edit, component: EditTrackPage },
	{ path: route.home, component: HomePage },
	{ path: route.error, component: ErrorPage },
];

export function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Suspense fallback={<FallbackPage />}>
				<Switch>
					{map(routeComponents, ({ path, component: Component }, key) => (
						<Route key={key} path={path} exact>
							<Component />
						</Route>
					))}
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}
