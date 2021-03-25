import React from 'react';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/HeaderBar';
import { Text } from '../components/Text';
import { TrackList } from '../components/TrackList';

export const HomePage: React.FC = () => (
	<>
		<HeaderBar>
			<Text type="h6">Track finder</Text>
		</HeaderBar>
		<Container maxWidth="md">
			<TrackList />
		</Container>
	</>
);
