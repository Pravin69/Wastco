const purgecss = require('@fullhuman/postcss-purgecss')

export const plugins = {
  tailwindcss: {},
  autoprefixer: {},
  plugins: [
    purgecss({
      content: ['./**/*.html','**/*.jsx',],
      css: ['css/index.css'],
    })
  ]
};
