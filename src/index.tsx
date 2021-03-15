import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { App } from './App';

const theme = createMuiTheme({
	palette: {
		primary: green,
		secondary: {
			main: '#f57c00',
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<CssBaseline />
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
