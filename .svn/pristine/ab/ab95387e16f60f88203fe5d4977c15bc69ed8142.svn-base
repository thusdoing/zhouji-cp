module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //强制语句分号结尾
    "semi": [2, "always"],
    // ===
    "eqeqeq": "off",
    "vue/no-parsing-error": [2, { "invalid-first-character-of-tag-name": false }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
