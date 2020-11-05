const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`, // режим сборки
  entry: `./src/main.js`, // точка входа
  devtool: `source-map`, // создает sourcemap,
  output: {
    filename: `bundle.js`, // название собранного файла и точка выхода
    path: path.join(__dirname, `public`),
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `https://localhost:8080`,
    compress: true,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
  },
};
