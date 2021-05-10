import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { App } from './App';
import { GetTracksDocument } from './types/graphql';
import { StyleWrapper } from './components/StyleWrapper';

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
			<StyleWrapper>
				<App />
			</StyleWrapper>
		</MockedProvider>
	);
	const titleElement = screen.getByAltText(/track finder/i);
	expect(titleElement).toBeInTheDocument();
});
