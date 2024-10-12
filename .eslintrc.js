module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        node: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['js', '.json', '.ts', '.d.ts'],
            },
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['import', 'prettier', '@typescript-eslint', 'simple-import-sort'],
    rules: {
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        '@typescript-eslint/no-explicit-any': ['error'],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'simple-import-sort/imports': [
            'error',
            {
                groups: [
                    // librairies import
                    ['^@?\\w'],
                    // Side effect imports.
                    ['^\\u0000'],
                    // Absolute imports and other imports such as Vue-style `@/foo`.
                    // Anything that does not start with a dot.
                    ['^[^.]'],
                    // Relative imports.
                    // Anything that starts with a dot.
                    ['^\\.'],
                ],
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: ['return', 'if', 'for', 'switch'] },
            { blankLine: 'always', prev: 'class', next: '*' },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            { blankLine: 'always', prev: 'multiline-const', next: '*' },
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/no-misused-promises': 'error',
    },
};
