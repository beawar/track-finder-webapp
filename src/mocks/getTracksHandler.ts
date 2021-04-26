import {
	AsyncResponseResolverReturnType,
	graphql,
	GraphQLContext,
	GraphQLRequest,
	MockedResponse,
	ResponseComposition,
} from 'msw';
import map from 'lodash/map';
import faker from 'faker';
import { GetTracksQuery, GetTracksQueryVariables } from '../types/graphql';
import { generateTracks } from './mocksGenerator';

function handler(
	req: GraphQLRequest<GetTracksQueryVariables>,
	res: ResponseComposition,
	ctx: GraphQLContext<GetTracksQuery>
): AsyncResponseResolverReturnType<MockedResponse<GetTracksQuery>> {
	const { limit, after, sort, searchText } = req.variables;

	const tracks = generateTracks(limit);
	const edges = map(tracks, (track) => ({ cursor: track.id, node: track }));

	return res(
		ctx.data({
			getTracks: {
				edges,
				pageInfo: {
					hasPreviousPage: after != null,
					hasNextPage: tracks.length === limit && faker.datatype.boolean(),
				},
			},
		})
	);
}

export const getTracksHandler = graphql.query<GetTracksQuery, GetTracksQueryVariables>(
	'getTracks',
	handler
);
