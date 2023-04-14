module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:prettier/recommended'],
	plugins: ['prettier'],
	rules: {
		'no-console': 'off',
		'prettier/prettier': [
			'error',
			{
				singleQuote: true,
				semi: true,
				useTabs: true,
				tabWidth: 2,
				trailingComma: 'all',
				printWidth: 200,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
	},
};
