import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Base configuration for all files
  js.configs.recommended,

  // TypeScript files configuration
  {
    files: ['src/**/*.{js,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
    },
  },

  // Test files configuration
  {
    files: ['src/tests/**/*.{js,ts}', 'src/**/*.spec.{js,ts}', 'src/**/*.test.{js,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      playwright: playwright,
      prettier: prettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'no-debugger': 'error',
      'prefer-const': 'error',
    },
  },

  // Utility files configuration (more relaxed)
  {
    files: ['src/utils/**/*.{js,ts}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn', // Allow any but warn
      'no-console': 'off', // Allow console in utils
      'no-debugger': 'error',
      'prefer-const': 'error',
    },
  },

  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'test-results/**',
      'playwright-report/**',
      'coverage/**',
      '*.d.ts',
    ],
  },
];
