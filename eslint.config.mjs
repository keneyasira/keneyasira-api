import eslint from '@eslint/js';
import prettierRecommended from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import importSortPlugin from 'eslint-plugin-simple-import-sort';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    prettierRecommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        ignores: ['node_modules', 'dist', 'eslint.config.js', 'jest.config.js'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                project: ['tsconfig.json'],
            },
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['js', '.json', '.ts', '.d.ts'],
                },
            },
        },

        plugins: {
            // importResolver: importResolverPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
            '@typescript-eslint': tseslint.plugin,
            'simple-import-sort': importSortPlugin,
        },
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
    },
];
