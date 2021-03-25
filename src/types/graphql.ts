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

export type Query = {
	__typename?: 'Query';
	/** track query */
	getTrack?: Maybe<Track>;
	findAll: Array<Track>;
	/** link query */
	getLink?: Maybe<Link>;
};

export type QueryGetTrackArgs = {
	id: Scalars['ID'];
};

export type QueryGetLinkArgs = {
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
};

export type TrackInput = {
	title: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	length?: Maybe<Scalars['Float']>;
	time?: Maybe<Scalars['Duration']>;
	altitudeDifference?: Maybe<Scalars['Int']>;
	links?: Maybe<Array<LinkInput>>;
};

export type BaseTrackFragment = { __typename?: 'Track' } & Pick<
	Track,
	'id' | 'title' | 'description' | 'length' | 'time' | 'altitudeDifference' | 'uploadTime'
>;

export type FindAllTracksQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllTracksQuery = { __typename?: 'Query' } & {
	findAll: Array<
		{ __typename?: 'Track' } & {
			links: Array<{ __typename?: 'Link' } & Pick<Link, 'id' | 'link'>>;
		} & BaseTrackFragment
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
	}
`;
export const FindAllTracksDocument = gql`
	query findAllTracks {
		findAll {
			...BaseTrack
			links {
				id
				link
			}
		}
	}
	${BaseTrackFragmentDoc}
`;

/**
 * __useFindAllTracksQuery__
 *
 * To run a query within a React component, call `useFindAllTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllTracksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllTracksQuery(
	baseOptions?: Apollo.QueryHookOptions<FindAllTracksQuery, FindAllTracksQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<FindAllTracksQuery, FindAllTracksQueryVariables>(
		FindAllTracksDocument,
		options,
	);
}
export function useFindAllTracksLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<FindAllTracksQuery, FindAllTracksQueryVariables>,
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<FindAllTracksQuery, FindAllTracksQueryVariables>(
		FindAllTracksDocument,
		options,
	);
}
export type FindAllTracksQueryHookResult = ReturnType<typeof useFindAllTracksQuery>;
export type FindAllTracksLazyQueryHookResult = ReturnType<typeof useFindAllTracksLazyQuery>;
export type FindAllTracksQueryResult = Apollo.QueryResult<
	FindAllTracksQuery,
	FindAllTracksQueryVariables
>;
// Generated on 2021-03-21T19:32:07+01:00
