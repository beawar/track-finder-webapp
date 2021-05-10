import {
	AsyncResponseResolverReturnType,
	graphql,
	GraphQLContext,
	GraphQLRequest,
	MockedResponse,
	ResponseComposition,
} from 'msw';
import mergeWith from 'lodash/mergeWith';
import { UpdateTrackMutation, UpdateTrackMutationVariables } from '../types/graphql';
import { convertTrackInputToTrack, generateTrack } from './mocksGenerator';

function handler(
	req: GraphQLRequest<UpdateTrackMutationVariables>,
	res: ResponseComposition,
	ctx: GraphQLContext<UpdateTrackMutation>
): AsyncResponseResolverReturnType<MockedResponse<UpdateTrackMutation>> {
	const { id, track } = req.variables;
	let updatedTrack = convertTrackInputToTrack(track);
	updatedTrack.id = `${id}`;
	const prevTrack = generateTrack(id);
	updatedTrack = mergeWith(prevTrack, updatedTrack, (value, srcValue) => value || srcValue);

	return res(
		ctx.data({
			updateTrack: updatedTrack,
		})
	);
}

export const updateTrackHandler = graphql.mutation('updateTrack', handler);
