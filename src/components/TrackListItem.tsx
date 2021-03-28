import React, { ForwardedRef, useMemo } from 'react';
import {
	Badge,
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Hidden,
	Link,
	ListItem,
	styled,
	Typography,
} from '@material-ui/core';
import map from 'lodash/map';
import { red } from '@material-ui/core/colors';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import { Skeleton } from '@material-ui/lab';
import { Track } from '../types/graphql';
import { CardPreview } from './CardPreview';
import { CustomChip } from './CustomChip';
import { chipFactory } from '../utils/chipsFactory';
import HikingRoundedIcon from '../icons/HikingRounded';

const Description = styled(Typography)({
	'-webkit-line-clamp': '2',
	'-webkit-box-orient': 'vertical',
	overflow: 'hidden',
	display: '-webkit-box',
});

const CardResources = styled(CardActions)({
	paddingLeft: '16px',
	paddingRight: '16px',
});

interface TrackListItemProps {
	track?: Track;
}

interface TrackItemProps {
	track: Track;
}

const TrackItem = ({ track }: TrackItemProps): JSX.Element => {
	const links = useMemo(() => {
		return (
			track &&
			map(
				track.links,
				({ link, id }) =>
					link && (
						<Link href={link} key={id} target="_blank" rel="noreferrer">
							{link}
						</Link>
					),
			)
		);
	}, [track]);

	const chips = useMemo(() => {
		const chipsList = chipFactory(track);
		return map(chipsList, ({ label, backgroundColor, icon: IconComponent, key }) => (
			<CustomChip
				icon={<IconComponent style={{ color: 'white' }} />}
				label={label}
				backgroundColor={backgroundColor}
				key={key}
			/>
		));
	}, [track]);

	return (
		<Box width="100%">
			<Card raised>
				<CardActionArea component="div">
					<Box display="flex" alignItems="center">
						<Hidden xsDown>
							<Box flexBasis="20%" display="flex" alignSelf="stretch">
								<CardPreview url={track.links?.length > 0 ? track.links[0].link : undefined} />
							</Box>
						</Hidden>
						<Box flexBasis="80%" minWidth={0} flexGrow={1}>
							<CardContent>
								<Typography variant="h5">{track.title}</Typography>
								<Box maxWidth="100%">
									<Description variant="body2">{track.description}</Description>
								</Box>
								<Box
									display="flex"
									justifyContent="flex-start"
									marginY="0.5rem"
									gridGap="0.5rem"
									flexWrap="wrap"
								>
									{chips}
									<CustomChip
										label="Trekking"
										backgroundColor={red[700]}
										icon={<HikingRoundedIcon style={{ color: 'white' }} />}
									/>
								</Box>
							</CardContent>
							<CardResources>
								<Box flexGrow={1} gridGap="0.5rem" display="flex" alignItems="center">
									{links && links.length > 0 && links[0]}
									{links && links.length > 1 && (
										<Badge badgeContent={`+${links.length - 1}`} color="secondary">
											<LinkRoundedIcon />
										</Badge>
									)}
								</Box>
								<GetAppRoundedIcon />
							</CardResources>
						</Box>
					</Box>
				</CardActionArea>
			</Card>
		</Box>
	);
};

const skeletonTrack = {} as Track;

const SkeletonTrackItem = React.forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => (
	<Skeleton width="100%" variant="rect" ref={ref}>
		<TrackItem track={skeletonTrack} />
	</Skeleton>
));

export const TrackListItem = React.forwardRef(
	({ track }: TrackListItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => (
		<ListItem>{track ? <TrackItem track={track} /> : <SkeletonTrackItem ref={ref} />}</ListItem>
	),
);
