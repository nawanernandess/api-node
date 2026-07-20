// eslint.config.js

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  js.configs.recommended,

  {
    files: ['src/**/*.ts'],

    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],

    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },

    rules: {
      /* TYPESCRIPT */

      '@typescript-eslint/no-explicit-any': 'error',

      '@typescript-eslint/no-empty-object-type': 'error',

      '@typescript-eslint/no-empty-interface': 'error',

      '@typescript-eslint/no-inferrable-types': 'error',

      '@typescript-eslint/no-non-null-assertion': 'error',

      '@typescript-eslint/no-floating-promises': 'error',

      '@typescript-eslint/no-misused-promises': 'error',

      '@typescript-eslint/await-thenable': 'error',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],

      /* VARIÁVEIS */

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'prefer-const': 'error',

      'no-var': 'error',

      /* CONSOLE */

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      /* QUALIDADE */

      eqeqeq: ['error', 'always'],

      curly: ['error', 'all'],

      'no-debugger': 'error',

      'no-alert': 'error',

      'no-eval': 'error',

      'no-implied-eval': 'error',

      'no-throw-literal': 'error',

      'object-shorthand': ['error', 'always'],

      /* IMPORTS */

      'unused-imports/no-unused-imports': 'error',

      'import/first': 'error',

      'import/newline-after-import': 'error',

      'import/no-duplicates': 'error',
    },
  },

  eslintConfigPrettier,
);
