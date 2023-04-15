const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	// devtool: "cheap-eval-source-map",
	entry: {
		index: "./src/index.js",
	},
	output: {
		path: path.resolve("./dist"),
		filename: "[name].js",
	},
	devtool: "inline-source-map",
	devServer: {
		static: "./dist",
		// 웹 소켓 전송, hot 및 live 리로드 로직을 위한 개발 서버 클라이언트
		hot: false,
		client: false,
	},
	module: {
		rules: [
			{
				test: /\.css/, //css 파일에대한 정규 표현식
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					esModule: false,
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Hot Module Replacement",
			template: "./src/index.html",
		}),
	],
};
