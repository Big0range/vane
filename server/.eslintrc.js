module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],

  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },

  rules: {
    'max-len': ['warn', { code: 200 }],
    // '@typescript-eslint/semi': ['error'],
    // 'object-curly-spacing': ['error', 'always'],
    // 'eol-last': ['error', 'always'],
    // 'lines-between-class-members': [
    //   'error',
    //   'always',
    //   { exceptAfterSingleLine: true },
    // ],
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-parameter-properties': 'off',
    // '@typescript-eslint/no-use-before-define': 'off',
    // 'max-classes-per-file': 'error',
    // 'prefer-template': 'error',
    // '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用any
    // '@typescript-eslint/no-unused-vars': 1,
    // '@typescript-eslint/no-var-requires': 'off',
  },
};
