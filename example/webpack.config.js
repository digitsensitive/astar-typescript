const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'game.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: require.resolve('Phaser'),
        loader: 'expose-loader',
        options: { exposes: { globalName: 'Phaser', override: true } }
      }
    ]
  },
  devServer: {
    static: path.resolve(__dirname, './'),
    host: 'localhost',
    port: 8080,
    open: false
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: path.join(__dirname, '/node_modules/phaser/dist/phaser.js')
    }
  }
};
