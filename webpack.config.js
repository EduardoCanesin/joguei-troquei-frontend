const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada do React
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,   // Processa arquivos JS e JSX
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,   // Para incluir arquivos CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Permite usar .js e .jsx sem especificar
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Gera o HTML que carrega o React
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),  // Diretório dos arquivos estáticos
    historyApiFallback: true,  // Redireciona todas as requisições para o index.html
    port: 3000,  // Porta do servidor de desenvolvimento
    open: true,  // Abre o navegador automaticamente  },
  }
};
