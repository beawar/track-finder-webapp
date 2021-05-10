import {
	AsyncResponseResolverReturnType,
	graphql,
	GraphQLContext,
	GraphQLRequest,
	MockedResponse,
	ResponseComposition,
} from 'msw';
import { GetTrackQuery, GetTrackQueryVariables } from '../types/graphql';
import { generateTrack } from './mocksGenerator';

function handler(
	req: GraphQLRequest<GetTrackQueryVariables>,
	res: ResponseComposition,
	ctx: GraphQLContext<GetTrackQuery>
): AsyncResponseResolverReturnType<MockedResponse<GetTrackQuery>> {
	const { id } = req.variables;

	return res(
		ctx.data({
			getTrack: generateTrack(id),
		})
	);
}

export const getTrackHandler = graphql.query<GetTrackQuery, GetTrackQueryVariables>(
	'getTrack',
	handler
);
