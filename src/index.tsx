import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import { App } from './App';
import { client } from './apollo/apollo';
import { StyleWrapper } from './components/StyleWrapper';

async function bootstrapApp(): Promise<void> {
	if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_MOCK === 'true') {
		// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
		const { worker } = require('./mocks/browser');
		await worker.start();
	}

	ReactDOM.render(
		<React.StrictMode>
			<CssBaseline />
			<ApolloProvider client={client}>
				<StyleWrapper>
					<App />
				</StyleWrapper>
			</ApolloProvider>
		</React.StrictMode>,
		document.getElementById('root')
	);
}

bootstrapApp();
