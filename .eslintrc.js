module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-recommended', 
    'eslint:recommended',
    'plugin:prettier/recommended', 
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'vue/no-unused-vars': 'warn', 
    'vue/no-multiple-template-root': 'off', 
  },
};
