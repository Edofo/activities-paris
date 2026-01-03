//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'vite.config.ts',
      'node_modules/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
  ...tanstackConfig,
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
    },
  },
]
