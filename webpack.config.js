//Para utilizar esta configuración base de webpack primero debemos tener instalados las siguientes libreriías/loaders/plugins:
//npm install react react-dom
//npm install webpack webpack-cli webpack-dev-server --save-dev
//npm install html-webpack-plugin html-loader --save-dev
//npm install babel-loader @babel/preset-env @babel/preset-react @babel/core @babel/plugin-transform-runtime babel-eslint @babel/runtime --save-dev
//npm install css-loader mini-css-extract-plugin --save-dev
//En el .babelrc debemos poner el siguiente codigo:
// {
//   "presets": ["@babel/preset-env", "@babel/preset-react"],
//   "plugins": ["@babel/plugin-transform-runtime"]
// }
const path = require('path'); // Es de Node y nos va a traer el path de nuestra carpeta
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	//Cual es el archivo principal y donde se encuentra, es el punto de entrada que va a leer webpack
	entry: './src/index.js',
	//Hacia donde vamos a compilar nuestro proyecto, donde se va a guardar nuestro resultado
	output: {
		//Resolve nos va a permitir saber donde estoy en la carpeta, utilizando el __dirname (que es una variable de Node que retorna el directorio del modulo actual (donde se encuentra el archivo de nuestra config). Una vez que ya se donde me encuentro voy a crear la carpeta 'dist', distribution, lo que vamos a enviar a produccion.
		path: path.resolve(__dirname, 'dist'),
		//bundle.js va a ser el archivo que vamos a tener que agregar al proyecto, HtmlWebpackPlugin va a agregarlo a nuestro html por nosotros
		filename: 'bundle.js',
	},
	//resolve va a indicar que extensiones va a estar escuchando nuestra configuracion, sobre las que va a trabajar. Particularmente solo vamos a usar .js y .jsx para react.
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	//El modulo va a tener ciertas reglas necesarias para la construccion de nuestro producto
	module: {
		rules: [
			//Esta es la regla que vamos a necesitar para detectar nuestros archivos js / jsx y que el babel loader pueda prepararlos para produccion. Debemos excluir a node_modules porque no debemos trabajar ni leer archivos de esta carpeta repletea de archivos js y jsx.
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			//Nuestra segunda regla tiene que ver con el HTML, ahora vamos a trabajar directamente con ellos y vamos a repetir los mismos pasos para que webpack pueda preparar nuestros archivos html para produccion. En este caso no vamos a excluir nada porque solo va a leer archivos html.
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
				],
			},
		],
	},
	//Aqui vamos a definir que plugins vamos a utilizar, debemos pasarlo por medio de un arreglo e instanciarlos con un new (por eso debemos hacer el require del inicio.
	plugins: [
		new HtmlWebpackPlugin({
			//Nuestro template es el punto de entrada que va a tomar este recurso, y el filename es el archivo que va a enviar en nuestra carpeta de dist.
			template: './public/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/[name].css',
		}),
	],
	//Por ultimo debemos configurar devserver, lo que nos va a permitir usar un servidor de desarrollo local donde vamos a poder ver los cambios de nuestra aplicacion "en vivo"
	devServer: {
		static: ['./dist'],
		open: true,
		hot: true,
		liveReload: true,
		compress: true,
		port: 3000,
	},
};
