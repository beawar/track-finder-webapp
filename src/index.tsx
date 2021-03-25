import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { ApolloProvider } from '@apollo/client';
import { App } from './App';
import { client } from './apollo/apollo';

const theme = createMuiTheme({
	palette: {
		primary: green,
		secondary: {
			main: '#f57c00',
		},
	},
});

async function bootstrapApp() {
	if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_MOCK === 'true') {
		// eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
		const { worker } = require('./mocks/browser');
		await worker.start();
	}

	ReactDOM.render(
		<React.StrictMode>
			<CssBaseline />
			<ApolloProvider client={client}>
				<MuiThemeProvider theme={theme}>
					<App />
				</MuiThemeProvider>
			</ApolloProvider>
		</React.StrictMode>,
		document.getElementById('root'),
	);
}

bootstrapApp();
