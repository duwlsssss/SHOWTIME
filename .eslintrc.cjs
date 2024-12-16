module.exports = {
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		project: ['./tsconfig.eslint.json'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	rules: {
		'no-unused-vars': 'off',
		'react/react-in-jsx-scope': 'off',
		'@typescript-eslint/no-explicit-any': 'off', // any 타입 허용
		'react/prop-types': 'off',
	},
};
