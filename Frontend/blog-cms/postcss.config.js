module.exports = {
  // Add you postcss configuration here
  // Learn more about it at https://github.com/webpack-contrib/postcss-loader#config-files
  plugins: [
    require("autoprefixer"),
    require("postcss-preset-env"),
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
  ],
};
