module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:prettier/recommended',
		'prettier',
		'airbnb-typescript-prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: 'tsconfig.json',
		sourceType: 'module',
	},
	env: {
		node: true,
		browser: true,
		jest: true,
	},
	plugins: ['@typescript-eslint', 'eslint-plugin-import-helpers'],
	rules: {
		'import-helpers/order-imports': [
			'error',
			{
				groups: ['/^react/', 'module', ['parent', 'sibling', 'index']],
				newlinesBetween: 'never',
			},
		],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
				maxEOF: 1,
				maxBOF: 0,
			},
		],
		quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
		'@typescript-eslint/object-curly-spacing': 'off',
		'import/prefer-default-export': 'off',
		'react/react-in-jsx-scope': 'off',
		'import/no-extraneous-dependencies': 'warn',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: ['node_modules', 'build', 'dist'],
};
