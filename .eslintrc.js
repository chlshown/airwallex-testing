module.exports = {
  root: true,

  env: {
    node: true,
    jest: true
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  rules: {
    'no-console': 'off',
    'eol-last': 'off',
    'space-in-parens': 'off',
    'space-before-function-paren': 'off',
    // 'space-in-parens': 'off',
    "indent": 'off',
    'comma-dangle': 'off',
    'prefer-promise-reject-errors': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: {
      jest: true
    }
  }]
}