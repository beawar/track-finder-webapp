import React, { useMemo } from 'react';
import map from 'lodash/map';
import { List, ListItem, ListItemIcon, Box, Link, Typography } from '@material-ui/core';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { Scalars, useGetTrackQuery } from '../types/graphql';
import { CustomChip } from './CustomChip';
import { chipFactory } from '../utils/chipsFactory';
import { parseDate, formatDate } from '../utils/utils';
import PreviewMountain from './images/mountain-hexagon.svg';

interface TrackDetailProps {
	id: Scalars['ID'];
}

export const TrackDetail: React.VFC<TrackDetailProps> = ({ id }) => {
	const { data, loading, error } = useGetTrackQuery({
		variables: {
			id,
		},
	});

	const chips = useMemo(() => {
		if (data?.getTrack) {
			const chipsList = chipFactory(data.getTrack);
			return map(chipsList, ({ label, backgroundColor, icon: IconComponent, key }) => (
				<CustomChip
					icon={<IconComponent style={{ color: 'white' }} />}
					label={label}
					backgroundColor={backgroundColor}
					key={key}
				/>
			));
		}
		return null;
	}, [data]);

	const links = useMemo(() => {
		return (
			data?.getTrack &&
			map(
				data.getTrack.links,
				({ link, id: linkId }) =>
					link && (
						<ListItem key={linkId}>
							<ListItemIcon>
								<LinkRoundedIcon />
							</ListItemIcon>
							<Link href={link} target="_blank" rel="noreferrer">
								{link}
							</Link>
						</ListItem>
					),
			)
		);
	}, [data]);

	if (error) {
		return <Typography>{error.message}</Typography>;
	}

	if (loading) {
		return <Typography>Loading Track</Typography>;
	}

	if (!data?.getTrack) {
		return <Typography>Track not found</Typography>;
	}

	return (
		<>
			<Box width="100%">
				<Box marginTop="1rem">
					<Typography variant="h3">{data.getTrack.title}</Typography>
				</Box>

				<Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
					<Box
						display="flex"
						justifyContent="flex-center"
						marginY="0.5rem"
						gridGap="0.5rem"
						flexWrap="wrap"
					>
						{chips}
					</Box>

					<Typography variant="h6">{formatDate(parseDate(data.getTrack.uploadTime))}</Typography>
				</Box>

				<Box marginY="1rem" display="flex">
					<Box display="flex" marginRight="0.5rem" maxWidth="50%">
						<img src={PreviewMountain} alt="Track" width="100%" />
					</Box>

					<Box display="flex" marginLeft="0.5rem" maxWidth="50%">
						<Typography variant="body2">{data.getTrack.description}</Typography>
					</Box>
				</Box>

				{links && links.length > 0 && (
					<Box>
						<Typography variant="h5">Links</Typography>
						<Box gridGap="0.5rem" display="flex" alignItems="center">
							<List dense>{links}</List>
						</Box>
					</Box>
				)}

				<Box>
					<Typography variant="h5">Download</Typography>
					<ListItem>
						<ListItemIcon>
							<GetAppRoundedIcon />
						</ListItemIcon>
						<Typography variant="body2">Track recording .gpx</Typography>
					</ListItem>
				</Box>
			</Box>
		</>
	);
};
