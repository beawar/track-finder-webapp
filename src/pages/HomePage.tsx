import React from 'react';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	IconButton,
	Typography,
} from '@material-ui/core';
import MoreVerticalIcon from '@material-ui/icons/MoreVert';
import DirectionsWalkRoundedIcon from '@material-ui/icons/DirectionsWalkRounded';
import { HeaderBar } from '../components/HeaderBar';

export const HomePage: React.FC = () => {
	const cardAction = () => {
		return (
			<IconButton>
				<MoreVerticalIcon />
			</IconButton>
		);
	};

	return (
		<>
			<HeaderBar>
				<Typography variant="h6">Track finder</Typography>
			</HeaderBar>
			<Container>
				<Card>
					<CardHeader action={cardAction} title="Track 1" subheader="16 marzo 2021" />
					<CardContent>
						<Typography variant="body2">Track descripton preview</Typography>
						<Button variant="contained" color="primary" startIcon={<DirectionsWalkRoundedIcon />}>
							Distance
						</Button>
					</CardContent>
				</Card>
			</Container>
		</>
	);
};
