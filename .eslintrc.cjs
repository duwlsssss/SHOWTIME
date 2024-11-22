module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended'
    ],
    rules: {
        'no-unused-vars': 'off',
    },
};
