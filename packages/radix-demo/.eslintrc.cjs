/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: [require.resolve('@repo/lint/vite.js')],
	ignorePatterns: ['postcss.config.js', 'tailwind.config.js'],
	parserOptions: {
		project: [`${__dirname}/tsconfig.json`, `${__dirname}/tsconfig.node.json`],
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'react/jsx-sort-props': 'off',
				'@typescript-eslint/no-empty-interface': 'off',
				'react/button-has-type': 'off',
				'@typescript-eslint/no-shadow': 'off',
				'no-console': 'off',
				'@typescript-eslint/array-type': 'off',
				'no-param-reassign': 'off',
				'@typescript-eslint/consistent-type-definitions': 'off',
				eqeqeq: 'off',
				'@typescript-eslint/sort-type-constituents': 'off',
				'react/jsx-boolean-value': 'off',
			},
		},
	],
	// plugins: ['@typescript-eslint'],
}
