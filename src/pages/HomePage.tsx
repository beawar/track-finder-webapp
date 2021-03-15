import React from 'react';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/HeaderBar';
import { Text } from '../components/Text';

export const HomePage: React.FC = () => (
	<>
		<HeaderBar>
			<Text type="h6">Track finder</Text>
		</HeaderBar>
		<Container>Main list here</Container>
	</>
);
