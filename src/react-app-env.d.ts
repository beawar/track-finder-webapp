/// <reference types="react-scripts" />

import { ApolloClient, InMemoryCache } from '@apollo/client';

declare global {
	namespace NodeJS {
		interface Global {
			apolloClient: ApolloClient<InMemoryCache>;
		}
		interface Window {
			IntersectionObserver: typeof IntersectionObserver;
		}
	}
}
