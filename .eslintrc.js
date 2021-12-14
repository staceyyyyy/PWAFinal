const fs = require("fs");
const path = require("path");
const projectPath = path.resolve(__dirname, "./");

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: 'airbnb',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        React: 'writable',
        snap: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
        allowImportExportEverywhere: false,
        codeFrame: false,
    },
    plugins: ['react'],
    rules: {
        'camelcase': 'off',
        'indent': ['error', 4],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 0,
        'react/no-array-index-key': 0,
        'import/no-named-as-default': 0,
        'max-len': ['error', { code: 150, ignoreComments: true }],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['hrefLeft', 'hrefRight'],
                aspects: ['invalidHref', 'preferButton'],
            },
        ],
        'no-restricted-imports': [
            'error',
            {
                paths: ['@material-ui/core', '@material-ui/icons', '@material-ui/lab'],
            },
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off'
    },
    settings: {
        'import/ignore': 'node_modules',
    },
};
