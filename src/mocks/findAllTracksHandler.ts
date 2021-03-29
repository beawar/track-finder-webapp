import { graphql, GraphQLContext, GraphQLRequest, ResponseComposition } from 'msw';
import map from 'lodash/map';
import faker from 'faker';
import { FindAllTracksQuery, FindAllTracksQueryVariables } from '../types/graphql';
import { generateTracks } from './mocksGenerator';

function handler(
	req: GraphQLRequest<FindAllTracksQueryVariables>,
	res: ResponseComposition,
	ctx: GraphQLContext<FindAllTracksQuery>,
) {
	const { limit, after } = req.variables;
	const tracks = generateTracks(limit);
	const edges = map(tracks, (track) => ({ cursor: track.id, node: track }));

	return res(
		ctx.data({
			getAllPageable: {
				edges,
				pageInfo: {
					hasPreviousPage: after != null,
					hasNextPage: tracks.length === limit && faker.random.boolean(),
				},
			},
		}),
	);
}

export const findAllTracksHandler = graphql.query<FindAllTracksQuery, FindAllTracksQueryVariables>(
	'findAllTracks',
	handler,
);
