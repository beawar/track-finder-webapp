module.exports = {
	env: {
		browser: true,
		jest: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/prettier',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: 'tsconfig.eslint.json',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'react-hooks', 'eslint-plugin-import-helpers'],
	rules: {
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.tsx'],
			},
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
			},
		],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				allowExpressions: true,
			},
		],
		'max-len': [
			'warn',
			{
				code: 100,
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'import/prefer-default-export': 'off',
		'react/prop-types': 'off',
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
		'react/react-in-jsx-scope': 'off',
		'import/no-extraneous-dependencies': 'warn',
		'react/require-default-props': 'off',
	},
	settings: {
		'import/resolver': {
			typescript: {},
		},
	},
	ignorePatterns: ['node_modules', 'build', 'dist'],
};
