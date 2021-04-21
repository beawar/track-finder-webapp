import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { HeaderBar } from '../components/HeaderBar';
import { Text } from '../components/Text';
import { TrackDetail } from '../components/TrackDetail';
import { Scalars } from '../types/graphql';

export const TrackPage: React.VFC = () => {
	const { id } = useParams<{ id: Scalars['ID'] }>();

	return (
		<>
			<HeaderBar>
				<Text type="h6">Track finder</Text>
			</HeaderBar>
			<Container maxWidth="lg">
				<TrackDetail id={id} />
			</Container>
		</>
	);
};
