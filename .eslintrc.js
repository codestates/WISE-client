module.exports = {
    env: {
        browser: true,
        node: true,
        es2020: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // 모던 ES의 파싱을 허용
        sourceType: 'module', // import의 사용을 허용
        ecmaFeatures: {
            jsx: true, // jsx의 파싱을 허용
        },
    },
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier',
    ],
    rules: {
        // 'react/react-in-jsx-scope': false,
        'no-console': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
        'import/extensions': 'off',
        'react/prop-types': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
        'prettier/prettier': 'error',
        'react/no-unescaped-entities': 'off',
        'import/no-cycle': [0, { ignoreExternal: true }],
        'prefer-const': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
    },
    settings: {
        'import/resolver': {
            'babel-module': {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                paths: ['src'],
            },
        },
    },
    globals: {
        React: 'writable',
    },
};
