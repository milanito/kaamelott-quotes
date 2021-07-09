module.exports = {
  env: {
    'jest/globals': true
  },
  extends: [
    'standard',
    'plugin:node/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: [
    'jest'
  ],
  rules: {
    "node/shebang": "off"
  },
  settings: {
  },
}
