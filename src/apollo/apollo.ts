import { ApolloClient, InMemoryCache } from '@apollo/client';
import { endpoints } from './endpoints';

const cache = new InMemoryCache();

export const client = new ApolloClient({
	uri: endpoints.track_finder,
	cache,
});
