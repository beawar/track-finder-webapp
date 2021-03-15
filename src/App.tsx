import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { routes } from './routes';

export function App(): JSX.Element {
	return (
		<BrowserRouter>
			<Switch>
				{routes.map(({ path, component, key }) => (
					<Route key={key} path={path} exact component={component} />
				))}
			</Switch>
		</BrowserRouter>
	);
}
