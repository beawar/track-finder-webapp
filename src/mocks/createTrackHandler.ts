import {
	AsyncResponseResolverReturnType,
	graphql,
	GraphQLContext,
	GraphQLRequest,
	MockedResponse,
	ResponseComposition,
} from 'msw';
import faker from 'faker';
import { CreateTrackMutation, CreateTrackMutationVariables } from '../types/graphql';
import { convertTrackInputToTrack } from './mocksGenerator';

function handler(
	req: GraphQLRequest<CreateTrackMutationVariables>,
	res: ResponseComposition,
	ctx: GraphQLContext<CreateTrackMutation>
): AsyncResponseResolverReturnType<MockedResponse<CreateTrackMutation>> {
	const { track } = req.variables;

	const resultTrack = convertTrackInputToTrack(track);
	resultTrack.id = `${faker.datatype.number({ min: 10000 })}`;

	return res(
		ctx.data({
			createTrack: resultTrack,
		})
	);
}

export const createTrackHandler = graphql.mutation('createTrack', handler);
