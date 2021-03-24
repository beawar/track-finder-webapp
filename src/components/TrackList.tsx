import React, { useMemo } from 'react';
import { List, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import map from 'lodash/map';
import { useFindAllTracksQuery } from '../types/graphql';
import { TrackListItem } from './TrackListItem';

export const TrackList = (): JSX.Element => {
	const { data, loading, error } = useFindAllTracksQuery();

	const tracks = useMemo(() => {
		if (data?.findAll) {
			return map(data.findAll, (track) => <TrackListItem key={track.id} track={track} />);
		}
		return null;
	}, [data]);

	if (error) {
		return <Typography>{error.message}</Typography>;
	}

	return (
		<List>
			{loading ? (
				<Skeleton width="100%" variant="rect">
					<TrackListItem />
				</Skeleton>
			) : (
				tracks
			)}
		</List>
	);
};
