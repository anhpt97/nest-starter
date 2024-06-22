const js = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { configs } = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...configs.recommendedTypeChecked,
  ...configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  {
    ignores: ['eslint.config.js'],
    languageOptions: { parserOptions: { project: true } },
    plugins: { '@stylistic': stylistic, import: eslintPluginImport },
    rules: {
      '@stylistic/lines-between-class-members': 'warn',
      '@stylistic/spaced-comment': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-useless-template-literals': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      // 'import/newline-after-import': 'warn',
      'prettier/prettier': 'warn',
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
  },
];
