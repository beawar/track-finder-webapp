import React from 'react';
import { createMuiTheme, MuiThemeProvider, responsiveFontSizes } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

let theme = createMuiTheme({
	palette: {
		primary: green,
		secondary: {
			main: '#f57c00',
		},
	},
	components: {
		MuiIconButton: {
			styleOverrides: {
				edgeEnd: {
					marginLeft: 'auto',
				},
			},
		},
	},
});

theme = responsiveFontSizes(theme);

export const StyleWrapper: React.FC = ({ children }) => {
	return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
