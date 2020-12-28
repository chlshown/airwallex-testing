module.exports = {
  presets: ['@vue/app'],
  env: {
    test: {
      presets: ['@babel/env'],
    },
  },
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk',
      },
    ],
  ],
}
