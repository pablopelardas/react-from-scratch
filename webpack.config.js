const path = require('path'); // Es de Node y nos va a traer el path de nuestra carpeta
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Nos va a insertar el bundle en nuestro html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Loader y minificador para CSS y SCSS

module.exports = {
  //Cual es el archivo principal y donde se encuentra, es el punto de entrada que va a leer webpack
  entry: './src/index.js',
  //Hacia donde vamos a compilar nuestro proyecto, donde se va a guardar nuestro resultado
  output: {
    //Resolve nos va a permitir saber donde estoy en la carpeta, utilizando el __dirname (que es una variable de Node que retorna el directorio del modulo actual (donde se encuentra el archivo de nuestra config). Una vez que ya se donde me encuentro voy a crear la carpeta 'dist', distribution, lo que vamos a enviar a produccion.
    path: path.resolve(__dirname, 'dist'),
    //bundle.js va a ser el archivo que vamos a tener que agregar al proyecto, HtmlWebpackPlugin va a agregarlo a nuestro html por nosotros
    filename: 'bundle.js',
    publicPath: '/',
  },
  //resolve va a indicar que extensiones va a estar escuchando nuestra configuracion, sobre las que va a trabajar. Particularmente solo vamos a usar .js y .jsx para react.
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@adapters': path.resolve(__dirname, 'src/adapters'), // Los adapters nos adaptan la información, formatean a una forma que nosotros queramos y la devuelven.
      '@assets': path.resolve(__dirname, 'src/assets'), // multimedia, tipografía, etc.
      '@components': path.resolve(__dirname, 'src/components'), // componentes que se usen en TODA la aplicacion
      '@contexts': path.resolve(__dirname, 'src/contexts'), // Manejo del estado diferente a Redux, cosas que solamente se encuentren dentro de una vista o simples y no valdria la pena meterlas en redux, mientras que en redux metemos cosas de toda la aplicación como información del usuario. RECOMENDADO USAR DENTRO DE UNA PAGE
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@interceptors': path.resolve(__dirname, 'src/interceptors'), //Hace una petición y si en la cabecera no se encuentra por ejemplo el token, lo intercepta. Por ejemplo que un usuario no esté autentificado.
      '@models': path.resolve(__dirname, 'src/models'), //TYPESRIPT, representaciones de nuestras entidades.
      '@pages': path.resolve(__dirname, 'src/pages'), //Las distintas Vistas que vamos a tener, dentro de ellas pueden tener las mismas carpetas de src en esta lista pero con las cosas particulares de cada vista.
      '@redux': path.resolve(__dirname, 'src/redux'), //Manejo de los estados, el store
      '@services': path.resolve(__dirname, 'src/services'), // Los servicios son las llamadas a las apis,
      '@styles': path.resolve(__dirname, 'src/styles'), // Estilos
      '@utilities': path.resolve(__dirname, 'src/utilities'), // Muchas veces vamos a reutilizar lógica y esa lógica hay que almacenarla en algún lado. Es lógica que sacada de contexto funciona en distintos lugares.
    },
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
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
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
    historyApiFallback: true,
    compress: true,
    port: 3000,
  },
};
