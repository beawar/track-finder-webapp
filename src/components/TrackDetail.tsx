import React, { useMemo } from 'react';
import map from 'lodash/map';
import { Container, Link, List, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import styled from '@emotion/styled';
import { Scalars, useGetTrackQuery } from '../types/graphql';
import { CustomChip } from './CustomChip';
import { chipFactory } from '../utils/chipsFactory';
import { formatDate, parseDate } from '../utils/utils';
import PreviewMountain from '../assets/mountain-hexagon.svg';
import { ChipsContainer, FlexBox } from './StyledComponents';

interface TrackDetailProps {
	id: Scalars['ID'];
}

const MainContainer = styled(Container)`
	margin-top: 2rem;
`;

const Row = styled(FlexBox)`
	justify-content: space-between;
	align-items: center;
	margin-top: 1rem;
	margin-bottom: 1rem;
	flex-wrap: wrap;
`;

const MainBox = styled(FlexBox)`
	align-items: flex-start;
	margin-top: 1rem;
	margin-bottom: 1rem;
	${({ theme }) => theme.breakpoints.up('md')} {
		& > * {
			flex: 0 0 50%;
		}
	}
	${({ theme }) => theme.breakpoints.down('md')} {
		flex-direction: column-reverse;
		align-items: center;
	}
`;

const ImgBox = styled(FlexBox)`
	justify-content: center;
	& > img {
		max-width: 100%;
		max-height: 500px;
		${({ theme }) => theme.breakpoints.up('md')} {
			max-height: 45vh;
		}
	}
`;

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
					)
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
		<MainContainer>
			<Typography variant="h3">{data.getTrack.title}</Typography>

			<Row>
				<ChipsContainer>{chips}</ChipsContainer>
				<Typography variant="h6">{formatDate(parseDate(data.getTrack.uploadTime))}</Typography>
			</Row>

			<MainBox>
				<ImgBox>
					<img src={PreviewMountain} alt="Track" />
				</ImgBox>
				<Typography variant="body2">{data.getTrack.description}</Typography>
			</MainBox>

			{links && links.length > 0 && (
				<Row>
					<div>
						<Typography variant="h5">Links</Typography>
						<List dense>{links}</List>
					</div>
				</Row>
			)}
			<Row>
				<div>
					<Typography variant="h5">Download</Typography>
					<List dense>
						<ListItem>
							<ListItemIcon>
								<GetAppRoundedIcon />
							</ListItemIcon>
							<Typography variant="body2">Track recording .gpx</Typography>
						</ListItem>
					</List>
				</div>
			</Row>
		</MainContainer>
	);
};
