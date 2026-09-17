import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        'jest/globals': true,
      },
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    ignores: ['dist/', 'coverage/', 'node_modules/', "webpack.*.js"],
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    }
  },
    { files: ['**/*.test.js', '**/*.spec.js', '**/__tests__/**/*.js'],
      languageOptions: {
        globals: {
          describe: 'readonly',
          it: 'readonly',
          expect: 'readonly',
          beforeEach: 'readonly',
          afterEach: 'readonly',
          beforeAll: 'readonly',
          afterAll: 'readonly',
          jest: 'readonly',
        },
      },
      rules: {
        'no-unused-vars': 'off',
        'no-empty-function': 'off',
        'max-lines-per-function': 'off',
        'no-console': 'off',
        'no-magic-numbers': 'off',
      },
    },
]);
