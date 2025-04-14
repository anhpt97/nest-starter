import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    js.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    eslintPluginPrettierRecommended,
  ],
  ignores: ['eslint.config.mjs'],
  languageOptions: { parserOptions: { projectService: true } },
  plugins: { '@stylistic': stylistic, import: importPlugin },
  rules: {
    '@stylistic/lines-between-class-members': 'warn',
    '@stylistic/spaced-comment': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-member-accessibility': [
      'warn',
      { accessibility: 'no-public' },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unnecessary-template-expression': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off',
    'import/newline-after-import': 'warn',
    'arrow-body-style': 'warn',
    eqeqeq: 'warn',
    'func-style': 'warn',
    'no-console': 'warn',
    'no-else-return': 'warn',
    'no-implicit-coercion': 'warn',
    'no-self-compare': 'warn',
    'no-unneeded-ternary': ['warn', { defaultAssignment: false }],
    'no-unused-expressions': 'warn',
    'no-useless-computed-key': ['warn', { enforceForClassMembers: true }],
    'no-useless-concat': 'warn',
    'no-useless-return': 'warn',
    'object-shorthand': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-destructuring': ['warn', { object: true }],
    'prefer-template': 'warn',
  },
});
