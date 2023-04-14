const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
	},
	output: {
		path: path.resolve('./dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.css/, //css 파일에대한 정규 표현식
				use: ['style-loader', 'css-loader'], // 사용할 모듈 설정
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
	],
};
