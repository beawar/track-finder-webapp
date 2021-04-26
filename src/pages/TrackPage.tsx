import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/HeaderBar';
import { TrackDetail } from '../components/TrackDetail';
import { Scalars } from '../types/graphql';

export const TrackPage: React.VFC = () => {
	const { id } = useParams<{ id: Scalars['ID'] }>();

	return (
		<>
			<HeaderBar />
			<Container maxWidth="lg">
				<TrackDetail id={id} />
			</Container>
		</>
	);
};
