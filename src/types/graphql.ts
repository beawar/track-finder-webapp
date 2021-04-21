/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** An RFC-3339 compliant DateTime Scalar */
	DateTime: string;
	/** ISO_8601 compliant Duration Scalar */
	Duration: string;
};

export type Activity = {
	__typename?: 'Activity';
	id: Scalars['ID'];
	name: Scalars['String'];
};

export type Link = {
	__typename?: 'Link';
	id: Scalars['ID'];
	link: Scalars['String'];
	mainLink?: Maybe<Scalars['Boolean']>;
};

export type LinkInput = {
	link: Scalars['String'];
	mainLink?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	/** track mutation */
	createTrack: Track;
	deleteTrack?: Maybe<Track>;
	/** link mutation */
	createLink: Track;
	deleteLink?: Maybe<Track>;
	createActivity: Activity;
	deleteActivity?: Maybe<Activity>;
	updateActivity?: Maybe<Activity>;
};

export type MutationCreateTrackArgs = {
	track: TrackInput;
};

export type MutationDeleteTrackArgs = {
	id: Scalars['ID'];
};

export type MutationCreateLinkArgs = {
	track: TrackInput;
};

export type MutationDeleteLinkArgs = {
	id: Scalars['ID'];
};

export type MutationCreateActivityArgs = {
	name: Scalars['String'];
};

export type MutationDeleteActivityArgs = {
	id: Scalars['ID'];
};

export type MutationUpdateActivityArgs = {
	id: Scalars['ID'];
	name: Scalars['String'];
};

export type PageInfo = {
	__typename?: 'PageInfo';
	startCursor?: Maybe<Scalars['ID']>;
	endCursor?: Maybe<Scalars['ID']>;
	hasPreviousPage: Scalars['Boolean'];
	hasNextPage: Scalars['Boolean'];
};

export type Query = {
	__typename?: 'Query';
	getTrack?: Maybe<Track>;
	getTracks?: Maybe<TrackConnection>;
	getLink?: Maybe<Link>;
	getActivities: Array<Activity>;
	getActivity?: Maybe<Activity>;
};

export type QueryGetTrackArgs = {
	id: Scalars['ID'];
};

export type QueryGetTracksArgs = {
	limit: Scalars['Int'];
	after?: Maybe<Scalars['ID']>;
	sort?: Maybe<Array<TrackSort>>;
	searchText?: Maybe<Scalars['String']>;
};

export type QueryGetLinkArgs = {
	id: Scalars['ID'];
};

export type QueryGetActivityArgs = {
	id: Scalars['ID'];
};

export type Track = {
	__typename?: 'Track';
	id: Scalars['ID'];
	title: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	length?: Maybe<Scalars['Float']>;
	time?: Maybe<Scalars['Duration']>;
	altitudeDifference?: Maybe<Scalars['Int']>;
	links: Array<Link>;
	uploadTime: Scalars['DateTime'];
	activity?: Maybe<Activity>;
};

export type TrackConnection = {
	__typename?: 'TrackConnection';
	edges: Array<TrackEdge>;
	pageInfo: PageInfo;
};

export type TrackEdge = {
	__typename?: 'TrackEdge';
	cursor: Scalars['ID'];
	node: Track;
};

export type TrackInput = {
	title: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	length?: Maybe<Scalars['Float']>;
	time?: Maybe<Scalars['Duration']>;
	altitudeDifference?: Maybe<Scalars['Int']>;
	links?: Maybe<Array<LinkInput>>;
	activity?: Maybe<Scalars['ID']>;
};

export enum TrackSort {
	IdAsc = 'ID_ASC',
	IdDesc = 'ID_DESC',
	UploadTimeAsc = 'UPLOAD_TIME_ASC',
	UploadTimeDesc = 'UPLOAD_TIME_DESC',
	TitleAsc = 'TITLE_ASC',
	TitleDesc = 'TITLE_DESC',
	TimeAsc = 'TIME_ASC',
	TimeDesc = 'TIME_DESC',
	LengthAsc = 'LENGTH_ASC',
	LengthDesc = 'LENGTH_DESC',
	AltDiffAsc = 'ALT_DIFF_ASC',
	AltDiffDesc = 'ALT_DIFF_DESC',
	ActivityNameAsc = 'ACTIVITY_NAME_ASC',
	ActivityNameDesc = 'ACTIVITY_NAME_DESC',
}

export type BaseTrackFragment = { __typename?: 'Track' } & Pick<
	Track,
	'id' | 'title' | 'description' | 'length' | 'time' | 'altitudeDifference' | 'uploadTime'
> & {
		activity?: Maybe<{ __typename?: 'Activity' } & Pick<Activity, 'id' | 'name'>>;
		links: Array<{ __typename?: 'Link' } & Pick<Link, 'id' | 'link'>>;
	};

export type GetTrackQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetTrackQuery = { __typename?: 'Query' } & {
	getTrack?: Maybe<{ __typename?: 'Track' } & BaseTrackFragment>;
};

export type GetTracksQueryVariables = Exact<{
	limit: Scalars['Int'];
	after?: Maybe<Scalars['ID']>;
}>;

export type GetTracksQuery = { __typename?: 'Query' } & {
	getTracks?: Maybe<
		{ __typename?: 'TrackConnection' } & {
			edges: Array<
				{ __typename?: 'TrackEdge' } & Pick<TrackEdge, 'cursor'> & {
						node: { __typename?: 'Track' } & {
							links: Array<{ __typename?: 'Link' } & Pick<Link, 'id' | 'link'>>;
						} & BaseTrackFragment;
					}
			>;
			pageInfo: { __typename?: 'PageInfo' } & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage'>;
		}
	>;
};

export const BaseTrackFragmentDoc = gql`
	fragment BaseTrack on Track {
		id
		title
		description
		length
		time
		altitudeDifference
		uploadTime
		activity {
			id
			name
		}
		links {
			id
			link
		}
	}
`;
export const GetTrackDocument = gql`
	query getTrack($id: ID!) {
		getTrack(id: $id) {
			...BaseTrack
		}
	}
	${BaseTrackFragmentDoc}
`;

/**
 * __useGetTrackQuery__
 *
 * To run a query within a React component, call `useGetTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTrackQuery(
	baseOptions: Apollo.QueryHookOptions<GetTrackQuery, GetTrackQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
}
export function useGetTrackLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetTrackQuery, GetTrackQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
}
export type GetTrackQueryHookResult = ReturnType<typeof useGetTrackQuery>;
export type GetTrackLazyQueryHookResult = ReturnType<typeof useGetTrackLazyQuery>;
export type GetTrackQueryResult = Apollo.QueryResult<GetTrackQuery, GetTrackQueryVariables>;
export const GetTracksDocument = gql`
	query getTracks($limit: Int!, $after: ID) {
		getTracks(limit: $limit, after: $after) {
			edges {
				cursor
				node {
					...BaseTrack
					links {
						id
						link
					}
				}
			}
			pageInfo {
				hasPreviousPage
				hasNextPage
			}
		}
	}
	${BaseTrackFragmentDoc}
`;

/**
 * __useGetTracksQuery__
 *
 * To run a query within a React component, call `useGetTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTracksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetTracksQuery(
	baseOptions: Apollo.QueryHookOptions<GetTracksQuery, GetTracksQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, options);
}
export function useGetTracksLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetTracksQuery, GetTracksQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, options);
}
export type GetTracksQueryHookResult = ReturnType<typeof useGetTracksQuery>;
export type GetTracksLazyQueryHookResult = ReturnType<typeof useGetTracksLazyQuery>;
export type GetTracksQueryResult = Apollo.QueryResult<GetTracksQuery, GetTracksQueryVariables>;
// Generated on 2021-04-14T21:41:26+02:00
