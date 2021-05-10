import React from 'react';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/HeaderBar';
import { TrackList } from '../components/TrackList';

export const HomePage: React.VFC = () => (
	<>
		<HeaderBar />
		<Container maxWidth="md">
			<TrackList />
		</Container>
	</>
);
