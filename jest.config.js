// jest.config.js
module.exports = {
	// [...]
	globals: {
		'ts-jest': {
			// ts-jest configuration goes here
			apolloClient: undefined,
		},
	},
};
