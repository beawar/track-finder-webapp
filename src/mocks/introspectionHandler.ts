import { graphql } from 'msw';

export const introspectionHandler = graphql.query('IntrospectionQuery', (req, res, ctx) =>
	res(ctx.data({}))
);
