import { ApolloClient, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { endpoints } from './endpoints';

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				getTracks: relayStylePagination(),
			},
		},
	},
});

export const client = new ApolloClient({
	uri: endpoints.track_finder,
	cache,
});
