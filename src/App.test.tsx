import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { App } from './App';
import { GetTracksDocument } from './types/graphql';

test('renders learn react link', () => {
	const mocks = [
		{
			request: {
				query: GetTracksDocument,
			},
			result: {
				data: {
					findAll: [],
				},
			},
		},
	];
	render(
		<MockedProvider mocks={mocks} cache={global.apolloClient.cache}>
			<App />
		</MockedProvider>
	);
	const titleElement = screen.getByText(/track finder/i);
	expect(titleElement).toBeInTheDocument();
});
