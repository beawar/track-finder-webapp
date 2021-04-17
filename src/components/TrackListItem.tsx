import React, { ForwardedRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
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
	Skeleton,
	Typography,
} from '@material-ui/core';
import map from 'lodash/map';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import styled from '@emotion/styled';
import { Track } from '../types/graphql';
import { CardPreview } from './CardPreview';
import { CustomChip } from './CustomChip';
import { chipFactory } from '../utils/chipsFactory';

const Description = styled(Typography)`
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	display: -webkit-box;
`;

const CardResources = styled(CardActions)`
	padding-left: 16px;
	padding-right: 16px;
`;

const ChipsContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	margin: 0.5rem auto;
	gap: 0.5rem;
	flex-wrap: wrap;
`;

const LinksContainer = styled.div`
	flex-grow: 1;
	gap: 0.5rem;
	display: flex;
	align-items: center;
`;

interface TrackListItemProps {
	track?: Track;
}

interface TrackItemProps {
	track: Track;
}

const TrackItem = ({ track }: TrackItemProps): JSX.Element => {
	const links = useMemo(() => {
		return map(
			track.links,
			({ link, id }) =>
				link && (
					<Link href={link} key={id} target="_blank" rel="noreferrer">
						{link}
					</Link>
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

	const history = useHistory();

	return (
		<Card raised sx={{ width: '100%' }}>
			<CardActionArea component="div" sx={{ display: 'flex', alignItems: 'center' }} onClick={() => history.push(`/track/${track.id}`)}>
				<Hidden smDown>
					<Box flexBasis="20%" display="flex" alignSelf="stretch">
						<CardPreview url={track.links?.length > 0 ? track.links[0].link : undefined} />
					</Box>
				</Hidden>
				<Box flexBasis="80%" minWidth={0} flexGrow={1}>
					<CardContent>
						<Typography variant="h5">{track.title}</Typography>
						<Description variant="body2" sx={{ maxWidth: '100%' }}>
							{track.description}
						</Description>
						<ChipsContainer>{chips}</ChipsContainer>
					</CardContent>
					<CardResources>
						<LinksContainer>
							{links && links.length > 0 && links[0]}
							{links && links.length > 1 && (
								<Badge badgeContent={`+${links.length - 1}`} color="secondary">
									<LinkRoundedIcon />
								</Badge>
							)}
						</LinksContainer>
						<GetAppRoundedIcon sx={{ marginLeft: '1rem' }} />
					</CardResources>
				</Box>
			</CardActionArea>
		</Card>
	);
};

const skeletonTrack = {} as Track;

const SkeletonTrackItem = React.forwardRef((props, ref: ForwardedRef<HTMLDivElement>) => (
	<Skeleton width="100%" variant="rectangular" ref={ref}>
		<TrackItem track={skeletonTrack} />
	</Skeleton>
));

export const TrackListItem = React.forwardRef(
	({ track }: TrackListItemProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => (
		<ListItem>{track ? <TrackItem track={track} /> : <SkeletonTrackItem ref={ref} />}</ListItem>
	)
);
