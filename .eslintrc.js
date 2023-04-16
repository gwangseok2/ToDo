module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: ['plugin:prettier/recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    'no-tabs': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        parser: 'flow',
      },
    ],
    parserOptions: {
      sourceType: 'module',
    },
  },
};
