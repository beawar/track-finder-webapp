import { graphql, GraphQLContext, GraphQLRequest, ResponseComposition } from 'msw';
import { FindAllTracksQuery, FindAllTracksQueryVariables } from '../types/graphql';
import { generateTracks } from './mocksGenerator';

function handler(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	req: GraphQLRequest<FindAllTracksQueryVariables>,
	res: ResponseComposition,
	ctx: GraphQLContext<FindAllTracksQuery>,
) {
	const tracks = generateTracks();

	return res(
		ctx.data({
			findAll: tracks,
		}),
	);
}

export const findAllTracksHandler = graphql.query<FindAllTracksQuery, FindAllTracksQueryVariables>(
	'findAllTracks',
	handler,
);
