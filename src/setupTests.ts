// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { client } from './apollo/apollo';
import { IntersectionObserverMock } from './mocks/IntersectionObserver';

// Establish API mocking before all tests.
beforeAll(() => {
	server.listen();
	Object.defineProperty(global, 'apolloClient', { value: client, writable: true });

	// mock a simplified Intersection Observer
	Object.defineProperty(window, 'IntersectionObserver', {
		writable: true,
		value: jest.fn().mockImplementation(IntersectionObserverMock),
	});
});

beforeEach(() => {
	// reset the cache of apollo
	global.apolloClient.cache.reset();
});
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
