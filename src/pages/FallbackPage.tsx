import React from 'react';
import { Box } from '@material-ui/core';
import Dovendev from '../assets/dovendev.jpg';
import { HeaderBar } from '../components/HeaderBar';

export const FallbackPage: React.VFC = () => {
	return (
		<Box display="flex" height="100vh">
			<HeaderBar />
			<Box display="flex" alignItems="center" justifyContent="center" width="100%">
				<img src={Dovendev} alt="Dovendev loading page" />
			</Box>
		</Box>
	);
};
