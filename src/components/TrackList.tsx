import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { List, Typography } from '@material-ui/core';
import map from 'lodash/map';
import { Scalars, useFindAllTracksQuery } from '../types/graphql';
import { TrackListItem } from './TrackListItem';
import { TRACKS_LOAD_LIMIT } from '../utils/constants';

export const TrackList = (): JSX.Element => {
	const skeletonRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);
	const [lastCursor, setLastCursor] = useState<Scalars['ID']>();
	const [hasNextPage, setHasNextPage] = useState<boolean>(false);
	const { data, loading, error, fetchMore } = useFindAllTracksQuery({
		variables: {
			limit: TRACKS_LOAD_LIMIT,
		},
		notifyOnNetworkStatusChange: true,
		onCompleted({ getAllPageable }) {
			if (getAllPageable) {
				setHasNextPage(getAllPageable.pageInfo.hasNextPage);
				setLastCursor(getAllPageable.edges[getAllPageable.edges.length - 1].node.id);
			}
		},
	});

	const tracks = useMemo(() => {
		if (data?.getAllPageable?.edges) {
			return map(data.getAllPageable.edges, ({ node: track }) => (
				<TrackListItem key={track.id} track={track} />
			));
		}
		return null;
	}, [data]);

	const loadMore = useCallback(() => {
		if (!loading) {
			fetchMore({
				variables: {
					after: lastCursor,
				},
			});
		}
	}, [loading, fetchMore, lastCursor]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					loadMore();
				}
			},
			{
				root: null,
				threshold: 0.25,
			},
		);

		const elementRef = skeletonRef.current;
		if (elementRef && hasNextPage) {
			observer.observe(elementRef);
		}

		return () => {
			if (elementRef) {
				observer.unobserve(elementRef);
			}
		};
	}, [hasNextPage, loadMore]);

	if (error) {
		return <Typography>{error.message}</Typography>;
	}

	return (
		<List ref={listRef}>
			{tracks}
			{loading && <TrackListItem />}
			{!loading && hasNextPage && <TrackListItem ref={skeletonRef} />}
		</List>
	);
};
