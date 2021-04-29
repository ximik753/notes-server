module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'object-curly-spacing': ['error', 'never'],
    quotes: ['error', 'single'],
    'space-before-function-paren': ['error', 'never'],
    'no-return-assign': 'off'
  }
}
