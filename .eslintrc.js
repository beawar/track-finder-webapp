module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: 'tsconfig.json',
	},
	plugins: [
		'eslint-plugin-import-helpers',
		'@typescript-eslint/eslint-plugin',
		'react',
		'react-hooks',
		'jest',
		'jsx-a11y',
		'prettier',
	],
	extends: [
		'eslint:recommended',
		'airbnb-typescript',
		'airbnb/hooks',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
		'prettier',
	],
	env: {
		browser: true,
		jest: true,
	},
	rules: {
		'brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'no-tabs': 'off',
		// react import not required anymore
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		// import
		'import/export': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'import/first': 'off',
		'import/named': 'off',
		'import/no-extraneous-dependencies': 'warn',
		'import/prefer-default-export': 'off',
		'prettier/prettier': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react/prop-types': 'off',
	},
	overrides: [
		{
			files: ['*.js'],
			rules: {
				// Allow `require()`
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
		{
			// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
			// enable the rule specifically for TypeScript files
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/explicit-function-return-type': ['error'],
				'@typescript-eslint/explicit-module-boundary-types': ['error'],
			},
		},
	],
};
