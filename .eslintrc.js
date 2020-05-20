module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 'off',
    'quotes': 'off',
    'indent': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'eol-last': 'off',
    'keyword-spacing': 'off',
    'prefer-const': 'off',
    'no-multi-spaces': 'off',
    'one-var': 'off',
    'comma-spacing': 'off',
    'no-mixed-operators': 'off',
    'comma-dangle': 'off',
    'no-return-assign': 'off'
  }
}
