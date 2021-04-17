import {
	AsyncResponseResolverReturnType,
	graphql,
	GraphQLContext,
	GraphQLRequest,
	MockedResponse,
	ResponseComposition,
} from 'msw';
import { GetActivitiesQuery, GetActivitiesQueryVariables } from '../types/graphql';
import { generateActivities } from './mocksGenerator';

const handler = (
	req: GraphQLRequest<GetActivitiesQueryVariables>,
	res: ResponseComposition,
	ctx: GraphQLContext<GetActivitiesQuery>
): AsyncResponseResolverReturnType<MockedResponse<GetActivitiesQuery>> => {
	const activities = generateActivities();

	return res(ctx.data({ getActivities: activities }));
};

export const getActivitiesHandler = graphql.query('getActivities', handler);
