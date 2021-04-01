import React from 'react';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/HeaderBar';
import { TrackList } from '../components/TrackList';

const HomePage: React.FC = () => (
	<>
		<HeaderBar />
		<Container maxWidth="md">
			<TrackList />
		</Container>
	</>
);

export default HomePage;
